import { JwtPayload } from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import User from '../user/user.model';

interface IUser {
  email: string;
  role: string;
  firstname: string;
  lastname: string;
  gender: string;
  birthday: string;
  residence: string;
  password: string;
}

export async function getUserByEmail(email: string) {
  const user = await User.find({ email });
  return user[0];
}

export async function register(user: IUser) {
  const { email, role, firstname, lastname, gender, birthday, residence, password } = user;

  const hashed = await bcrypt.hashSync(password, 10);
  const newUser = await User.create({
    email,
    role,
    firstname,
    lastname,
    gender,
    birthday,
    residence,
    password: hashed,
  });
  return newUser;
}

export async function login(email: string, password: string) {
  const user = await getUserByEmail(email);
  if (user) {
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    }
  }
  return null;
}

export async function jwtCallback(jwtPayload: JwtPayload, done: (...args: unknown[]) => void) {
  const user = await getUserByEmail(jwtPayload.email);
  return done(null, user || false);
}
