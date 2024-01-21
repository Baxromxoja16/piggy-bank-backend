import { Schema } from 'mongoose';

export interface IUser {
  email: Schema.Types.ObjectId;
  password: string;
  role: string;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  residence: string;
}
