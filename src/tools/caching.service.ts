import { createClient, RedisClientType } from 'redis';
import { Logger } from 'winston';
import { logger } from './Logger';

class CachingService {
  private client: RedisClientType;

  private logger: Logger;

  constructor(logger: Logger) {
    this.client = createClient({ url: 'redis://127.0.0.1:6379' });
    this.logger = logger.child({ module: 'Caching' });
  }

  getClient() {
    return this.client;
  }

  async connectRedis() {
    await this.client.connect();
    this.logger.info('Redis initialized!');
  }
}

export const caching = new CachingService(logger);
