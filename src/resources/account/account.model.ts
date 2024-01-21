import { Model, Schema, model } from 'mongoose';

interface IAccount {
  user_id: Schema.Types.ObjectId;
  currency: string;
  title: string;
  description?: string;
  type: string;
  balance: number;
  sign: string;
}

interface AccountModel extends Model<IAccount> {
  getByUserId(id: string): IAccount[];
}

const accountSchema = new Schema<IAccount, AccountModel>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      min: 3,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    sign: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

accountSchema.statics.getByUserId = function getById(user_id) {
  // return this.where({ user_id }).cache({key: user_id}).exec();
  return this.where({ user_id }).exec();
};

export default model<IAccount, AccountModel>('Account', accountSchema);
