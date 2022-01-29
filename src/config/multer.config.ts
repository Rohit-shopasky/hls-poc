/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException } from '@nestjs/common';
import { MAX_UPLOAD_VIDEO_FILE_SIZE } from '../common/constants';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const multerOptions: MulterOptions = {
  limits: {
    fileSize: MAX_UPLOAD_VIDEO_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/\/(mp4|flv)$/)) {
      cb(null, true);
    } else {
      cb(new HttpException('Only mp4 and flv files are allowed', 400), false);
    }
  },

  storage: diskStorage({
    destination: function(req, file, cb) {
      cb(null, './files');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.mp4');
    },
  }),
};
