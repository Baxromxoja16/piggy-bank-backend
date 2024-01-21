import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../tools/httpError';
import { register, login } from './auth.repository';
import config from '../../config/config';

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //@ts-ignore
      throw new HttpError('Validation error: ', 403, errors);
    }
    const { email, password, role, firstname, lastname, gender, birthday, residence } = req.body;
    if (new Date().getFullYear() - new Date(birthday).getFullYear() >= 18) {
      const user = await register({
        email,
        password,
        role,
        firstname,
        lastname,
        gender,
        birthday,
        residence,
      });
      res.json(user);
    } else {
      throw new HttpError('Registering age is over 18 y.o', 401);
    }
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //@ts-ignore
      throw new HttpError('Invalid credentials!', 403, errors);
    }
    const { email, password } = req.body;
    const user = await login(email, password);
    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
      res.status(200).json({
        token: `Bearer ${token}`,
        expiresIn: config.JWT_EXPIRES_IN,
      });
    } else {
      throw new HttpError('Invalid credentials!', 403);
    }
  } catch (err) {
    next(err);
  }
}
