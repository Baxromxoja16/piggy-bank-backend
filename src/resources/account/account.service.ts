import { NextFunction, Request, Response } from 'express';
import Currency from 'currency-formatter';
import Transaction from '../transaction/transaction.model';
import Account from './account.model';

export async function createAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    const account = { ...req.body, user_id: user?.id };
    account.sign = Currency.findCurrency(account.currency)?.symbol;
    const newAccount = await Account.create(account);
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
}

export async function updateAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const acc = await Account.findById(req.params.id);
    if (req.body?.currency && req.body.currency == acc?.currency) {
      const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(201).json(account);
      return;
    }
    const sign = Currency.findCurrency(req.body.currency)?.symbol;
    const account = await Account.findByIdAndUpdate(req.params.id, { ...req.body, sign }, { new: true });
    res.status(201).json(account);
    // await clearHash( req.user?.id );
  } catch (err) {
    next(err);
  }
}

export async function deleteAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await Account.findByIdAndDelete(id);
    await Transaction.findOneAndDelete({ account_id: id });
    res.status(204).json();
    // await clearHash( req.user?.id );
  } catch (err) {
    next(err);
  }
}

export async function getAccountsByUserId(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user;
    const accounts = await Account.getByUserId(user?.id as string);
    res.json(accounts);
  } catch (err) {
    next(err);
  }
}

export async function getAccountById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    // const account = await Account.findById(id).cache({key: req.user?.id});
    const account = await Account.findById(id);
    res.json(account);
  } catch (err) {
    next(err);
  }
}
