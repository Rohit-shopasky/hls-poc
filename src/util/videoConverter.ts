/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { IBucketArgs } from './interfaces';
import * as fs from 'fs';
import * as s3 from 's3-node-client';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4',
});

const client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  },
});

@Injectable()
export class ConvertVideo {
  constructor() {}
  async convertVideo(filepath: string, videoId: string): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      /** Create a video directory */
      fs.mkdirSync(`./files/converted/${videoId}`);

      ffmpeg.setFfmpegPath(ffmpegInstaller.path);
      ffmpeg(filepath, { timeout: 432000 })
        .addOptions([
          '-profile:v baseline',
          '-level 3.0',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(`files/converted/${videoId}/${videoId}-v.m3u8`)
        .on('end', async () => {
          console.log('Video converted!');

          const params: IBucketArgs = {
            localDir: `./files/converted/${videoId}`,
            deleteRemoved: true,
            s3Params: {
              Bucket: process.env.BUCKET_URL,
              Prefix: `/${videoId}`,
            },
          };
          try {
            await this.uploadHlsVideoToS3(params, filepath);
            console.log('video uploaded to s3');
            resolve(true);
          } catch (error) {
            console.log('Something went wrong while uploading video to s3');
            rejects(error);
          }
        })
        .on('error', error => {
          rejects(error);
        })
        .run();
    });
  }

  async uploadHlsVideoToS3(
    params: IBucketArgs,
    originalVideoFilePath: string,
  ): Promise<boolean> {
    return new Promise((resolve, rejects) => {
      const upLoader = client.uploadDir(params);
      upLoader.on('error', error => {
        rejects(error.stack);
      });
      /* will use it later
          upLoader.on('progress', function() {
            console.log(
              'progress',
              upLoader.progressAmount,
              upLoader.progressTotal,
            );
          });*/
      upLoader.on('end', async () => {
        this.deleteVideo(params.localDir, originalVideoFilePath);
        resolve(true);
      });
    });
  }

  deleteVideo(dir: string, originalVideoFilePath: string): boolean {
    try {
      fs.rmdirSync(dir, { recursive: true });
      fs.unlinkSync(originalVideoFilePath);
      console.log('converted files deleted from machine!');
      return true;
    } catch (error) {
      throw error;
    }
  }
}
