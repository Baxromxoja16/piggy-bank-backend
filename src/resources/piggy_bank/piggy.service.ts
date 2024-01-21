import { NextFunction, Request, Response } from 'express';
import PiggyBank from './piggy.model';

export async function getAllPiggyBanks(req: Request, res: Response, next: NextFunction) {
  try {
    const { accountId } = req.params;
    const piggyBanks = await PiggyBank.find({ accountId });
    res.json(piggyBanks);
  } catch (err) {
    next(err);
  }
}

export async function getPiggyBankById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const piggybank = await PiggyBank.findById(id);
    res.json(piggybank);
  } catch (err) {
    next(err);
  }
}

export async function createPiggyBank(req: Request, res: Response, next: NextFunction) {
  try {
    const piggybank = await PiggyBank.create({ ...req.body, accountId: req.params.accountId });
    res.json(piggybank);
  } catch (err) {
    next(err);
  }
}

export async function updatePiggyBank(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const piggybank = await PiggyBank.findByIdAndUpdate(id, req.body, { new: true });
    res.json(piggybank);
  } catch (err) {
    next(err);
  }
}

export async function crashPiggyBank(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await PiggyBank.findByIdAndDelete(id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
