import { Schema, model, Model } from 'mongoose';
import { type IUser } from './interfaces';

type UserModel = Model<IUser>;

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      min: 7,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'USER',
    },
    firstname: {
      type: String,
      required: true,
      min: 3,
    },
    lastname: {
      type: String,
      required: true,
      min: 3,
    },
    gender: {
      type: String,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    residence: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser, UserModel>('User', userSchema);
