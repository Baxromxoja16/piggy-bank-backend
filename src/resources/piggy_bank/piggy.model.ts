import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      default: '',
    },
    goal: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model('Piggybank', subscriptionSchema);
