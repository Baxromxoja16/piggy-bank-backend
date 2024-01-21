import { NextFunction, Request, Response } from 'express';
import {} from '../tools/httpError';
import { logger, HttpError } from '../tools';

function errorHandler(err: HttpError | Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    if (err.body) {
      logger.error(`RESPONSE | Status: ${err.statusCode} message: ${err.message}`);
      res.status(err.statusCode).json({ message: err.message, body: err.body });
    } else {
      res.status(err.statusCode).json({ message: err.message });
      logger.error(`RESPONSE | Status: ${err.statusCode} message: ${err.message}`);
    }
  } else {
    res.status(500).json(err.message);
    logger.error(`RESPONSE | Status: 500 message: ${err.message}`);
  }
  next();
}

export default errorHandler;
