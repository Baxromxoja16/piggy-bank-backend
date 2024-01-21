import { Schema, model } from 'mongoose';

const ObligatorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: 'Description',
    },
    amount: {
      type: Number,
      required: true,
    },
    firstPaymentDate: {
      type: Date,
      required: true,
    },
    lastPaymentDate: {
      type: Date,
      required: true,
    },
    frequency: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Obligatory', ObligatorySchema);
