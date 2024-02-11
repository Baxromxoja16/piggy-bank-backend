import { NextFunction, Request, Response } from 'express';
import Transaction from '../transaction/transaction.model';
import { ObjectId } from 'mongodb'

export async function getAllStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    const { accountId } = req.params;

    const aggr = await Transaction.aggregate([
      {
        $match: {
          accountId: new ObjectId(accountId)
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$date_of_operation" }
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          expenses: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      },
      {
        $project: {
          monthYear: "$_id",
          income: 1,
          expenses: 1,
          savings: { $subtract: ["$income", "$expenses"] },
          percentOfSavings: {
            $cond: [
              { $eq: ["$income", 0] }, // Check if income is zero
              0, // Return 0 if income is zero
              {
                $multiply: [
                  { $divide: [{ $subtract: ["$income", "$expenses"] }, "$income"] },
                  100
                ]
              }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              monthYear: "$monthYear",
              income: "$income",
              expenses: "$expenses",
              savings: "$savings",
              percentOfSavings: "$percentOfSavings"
            }
          },
          totalIncome: { $sum: "$income" },
          totalExpenses: { $sum: "$expenses" },
          totalSavings: { $sum: "$savings" },
          totalPercentOfSavings: { $avg: "$percentOfSavings" }
        }
      },
      {
        $unwind: "$data"
      },
      {
        $project: {
          _id: 0,
          monthYear: "$data.monthYear",
          income: "$data.income",
          expenses: "$data.expenses",
          savings: "$data.savings",
          percentOfSavings: "$data.percentOfSavings",
          totalIncome: 1,
          totalExpenses: 1,
          totalSavings: 1,
          totalPercentOfSavings: 1
        }
      }
    ])

    res.json(aggr);
  } catch (err) {
    next(err);
  }
}
