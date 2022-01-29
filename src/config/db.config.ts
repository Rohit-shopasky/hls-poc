import { ICredentials } from '../common/interfaces';

export const getDbCredentials = (): ICredentials => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    uri: ['development', 'production', 'staging'].includes(process.env.NODE_ENV)
      ? process.env.SERVER_MONGODB
      : process.env.LOCAL_MONGODB,
  };
};
