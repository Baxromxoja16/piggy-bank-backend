import { Model, Schema, model } from 'mongoose';

export interface ITransaction {
  type: string;
  accountId: Schema.Types.ObjectId;
  amount: number;
  description?: string;
  date_of_operation: Date;
  title: string;
  payee?: string;
  categories: string[];
}
interface TransactionModel extends Model<ITransaction> {
  findByAccountId(id: string): Promise<ITransaction[]>;
}
const transactionSchema = new Schema<ITransaction, TransactionModel>(
  {
    type: {
      type: String,
      required: true,
      validate: {
        validator: (type: string) => ['income', 'expense'].includes(type),
      },
    },
    accountId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Account',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    date_of_operation: {
      type: Date,
      required: true,
      default: Date.now,
    },
    payee: {
      type: String,
      required: false,
      default: 'No payee',
    },
    categories: [
      {
        type: String,
        ref: 'Category',
        required: true,
      },
    ],
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

transactionSchema.statics.findByAccountId = function findByAccountId(accountId: string) {
  // return this.where({ accountId }).cache({key: userId}).exec();
  return this.where({ accountId }).exec();
};

export default model<ITransaction, TransactionModel>('Transaction', transactionSchema);
