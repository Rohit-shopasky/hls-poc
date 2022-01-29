import * as AWS from 'aws-sdk';
import { InternalServerErrorException } from '@nestjs/common';
const region = process.env.AWS_REGION;
AWS.config.update({
  region,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});
AWS.config.getCredentials((err: Error) => {
  if (err) {
    const error = 'Aws connection error. Msg: ' + err.message;
    throw new InternalServerErrorException(error);
  }
});

export const AWSClient = AWS;
