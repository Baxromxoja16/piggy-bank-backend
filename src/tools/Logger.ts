import { Request, Response, NextFunction } from 'express';
import { createLogger, transports, format } from 'winston';

const { combine, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => `${timestamp} [${level}] : ${message}`);

export const logger = createLogger({
  level: 'info',
  format: combine(colorize(), format.timestamp({ format: 'HH:mm:ss' }), myFormat),
  transports: [new transports.Console()],
});

export const Logger = function Logger(req: Request, res: Response, next: NextFunction) {
  logger.info(`REQUEST | method: ${req.method},  URL: ${req.url}`);
  logger.info(`RESPONSE | Status: ${res.statusCode}`);
  next();
};
