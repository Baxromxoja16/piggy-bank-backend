import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const config = {
  PORT: process.env.PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  DB_NAME: process.env.DB_NAME as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
};

export default config;
