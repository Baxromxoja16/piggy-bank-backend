import { NextFunction, Request, Response } from 'express';
import Transaction from '../transaction/transaction.model';
import { ObjectId } from 'mongodb'

export async function getAllStatistics(req: Request, res: Response, next: NextFunction) {
  try {
    const { accountId } = req.params;
    const { start, end } = req.body;

    const aggr = await Transaction.aggregate([
      {
        $match: {
          accountId: new ObjectId(accountId),
          date_of_operation: {
            $gte: new Date(start),
            $lte: new Date(end)
          }
        }
      },
      {
        $group: {
          _id: {
            monthYear: { $dateToString: { format: "%Y-%m", date: "$date_of_operation" } },
            category: "$categories"
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
        }
      },
      {
        $group: {
          _id: "$_id.monthYear",
          totalIncome: { $sum: "$income" },
          totalExpenses: { $sum: "$expenses" },
          totalSavings: { $sum: "$savings" },
          totalPercentOfSavings: { $avg: "$percentOfSavings" },
          categoryStats: {
            $push: {
              category: "$_id.category",
              categoryAmount: "$expenses",
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          totalIncome: 1,
          totalExpenses: 1,
          totalSavings: 1,
          categoryStats: 1,
          totalPercentOfSavings: {
            $cond: [
              { $eq: ["$totalIncome", 0] }, // Check if income is zero
              {
                $multiply: [
                  { $divide: [{ $subtract: ["$totalIncome", "$totalExpenses"] }, 1] },
                  1
                ]
              }, // Return 0 if income is zero
              {
                $multiply: [
                  { $divide: [{ $subtract: ["$totalIncome", "$totalExpenses"] }, "$totalIncome"] },
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
          totalIncome: { $sum: "$totalIncome" },
          totalExpenses: { $sum: "$totalExpenses" },
          totalSavings: { $sum: "$totalSavings" },
          // totalPercentOfSavings: { $push: "$totalPercentOfSavings" },
          allMonths: {
            $push: {
              monthYear: "$_id",
              totalIncome: "$totalIncome",
              totalExpenses: "$totalExpenses",
              totalSavings: "$totalSavings",
              totalPercentOfSavings: "$totalPercentOfSavings",
              categoryStats: "$categoryStats.category",
              categoryAmount: "$categoryStats.categoryAmount"
            }
          }
        }
      },
    ])

    res.json(aggr);
  } catch (err) {
    next(err);
  }
}
