import { NextFunction, Request, Response } from 'express';
import Account from '../account/account.model'

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
    const account = await Account.findById(req.params.accountId);

    // Tranzaksiya miqdorini olish
    const { amount, type } = req.body;

    if (account?.balance! < amount && type === 'expense') {
      return res.status(500).json({ message: "You don't have enough money in your account" });
    }

    // Tranzaksiya turi "expense" bo'lsa, balansdan ayirish
    if (type === "expense" && account !== null) {
      account.balance -= amount;
    } else if (type === "income" && account !== null) {
      // Tranzaksiya turi "income" bo'lsa, balansga qo'shish
      account.balance += amount;
    }

    // Hisobni yangilash
    await account?.save();

    // Tranzaksiyani qo'shish
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
   // Tranzaksiyani o'chirish
   const transaction = await Transaction.findByIdAndDelete(req.params.id);

   if (!transaction) {
     return res.status(404).json({ message: "Tranzaksiya topilmadi" });
   }

   // Hisobni olish
   const account = await Account.findById(transaction.accountId);

   // Tranzaksiya miqdorini qayta hisoblash
   if (transaction.type === "expense" && account) {
     account.balance += transaction.amount;
   } else if (transaction.type === "income" && account) {
     account.balance -= transaction.amount;
   }

   // Hisobni yangilash
   await account?.save();

   res.status(200).json();
  } catch (err) {
    next(err);
  }
}
