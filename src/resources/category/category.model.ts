import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    min: 3,
  },
  type: {
    type: String,
    validate: {
      validator: (type: string) => ['income', 'expense'].includes(type),
      message: '{VALUE} is not a valid type, accept only income or expense',
    },
  },
});

export default model('Category', categorySchema);
