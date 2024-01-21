import { Schema, model, Model } from 'mongoose';

export interface ISubsription {
  account_id: Schema.Types.ObjectId;
  title: string;
  description: string;
  type: string;
  amount: number;
  first_day_payment: string;
  last_day_payment: string;
  frequency: number;
  category: string;
  currency: string;
  day_of_payment: string;
}

type SubscriptionModel = Model<ISubsription>;

const subscriptionSchema = new Schema<ISubsription, SubscriptionModel>(
  {
    account_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    first_day_payment: {
      type: String,
      required: true,
    },
    last_day_payment: {
      type: String,
      required: true,
    },
    day_of_payment: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ISubsription, SubscriptionModel>('Subscription', subscriptionSchema);
