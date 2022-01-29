import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoUploadModule } from './videoUpload/videoUpload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getDbCredentials } from './config/db.config';

@Module({
  imports: [
    VideoUploadModule,
    MongooseModule.forRootAsync({
      useFactory: async () => {
        return getDbCredentials();
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
