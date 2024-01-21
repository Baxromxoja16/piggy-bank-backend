import { NextFunction, Request, Response } from 'express';

export async function getAllStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    res.json('Get all statistics');
  } catch (err) {
    next(err);
  }
}
