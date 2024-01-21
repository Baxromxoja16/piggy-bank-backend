import dotenv from "dotenv";
dotenv.config();

import app from './app';
import config from './config/config';
import { logger } from './tools/Logger';

app.listen(config.PORT || 3000, () => {
  logger.info('Sever is running!');
});
