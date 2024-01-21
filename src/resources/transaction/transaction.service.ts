import { NextFunction, Request, Response } from 'express';

import Transaction from './transaction.model';

export async function getAllTransAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { accoundId } = req.params;
    const transactions = await Transaction.findByAccountId(accoundId);
    res.send(transactions);
  } catch (err) {
    next(err);
  }
}

export async function getTransById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    // const transaction = await Transaction.findById(id).cache({key: req.user?.id});
    const transaction = await Transaction.findById(id);
    res.json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function createTrans(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await Transaction.create({ ...req.body, accountId: req.params.accountId });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function updateTrans(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(transaction);
  } catch (err) {
    next(err);
  }
}

export async function deleteTrans(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
