import { NextFunction, Request, Response } from 'express';
import Obligatory from './obligatory.model';

export async function getAllObligatory(req: Request, res: Response, next: NextFunction) {
  try {
    const obligatories = await Obligatory.find({});
    res.json(obligatories);
  } catch (err) {
    next(err);
  }
}
export async function getObligatoryById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const obligatory = await Obligatory.findById(id);
    res.json(obligatory);
  } catch (err) {
    next(err);
  }
}
export async function createObligatory(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    const obligatory = await Obligatory.create({ ...req.body, userId: user?.id });
    res.json(obligatory);
  } catch (err) {
    next(err);
  }
}
export async function updateObligatory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const obligatory = await Obligatory.findByIdAndUpdate(id, req.body, { new: true });
    res.json(obligatory);
  } catch (err) {
    next(err);
  }
}
export async function deleteObligatory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await Obligatory.findByIdAndDelete(id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
