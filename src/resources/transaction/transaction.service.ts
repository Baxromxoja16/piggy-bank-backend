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
   const findTransaction = await Transaction.findById(req.params.id);

   if (!findTransaction) {
     return res.status(404).json({ message: "Tranzaksiya topilmadi" });
   }

   // Hisobni olish
   const account = await Account.findById(findTransaction.accountId);

   // Tranzaksiya miqdorini qayta hisoblash
   if (findTransaction.type === "expense" && account) {
     account.balance += findTransaction.amount;
   } else if (findTransaction.type === "income" && account) {
      if (account?.balance! < findTransaction.amount) {
        return res.status(500).json(
          { message: "You can't remove this transaction" }
        );
      } else {
        account.balance -= findTransaction.amount;
      }
   }
   await Transaction.findByIdAndDelete(req.params.id);

   // Hisobni yangilash
   await account?.save();

   res.status(200).json();
  } catch (err) {
    next(err);
  }
}
