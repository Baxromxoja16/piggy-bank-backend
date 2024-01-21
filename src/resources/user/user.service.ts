import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../tools';
import UserRepository from './user.repository';

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserRepository.editUser(req.params.id, req.body);
    if (!user) {
      throw new HttpError(`There is no user with the id ${req.params.id} `, 404);
    }
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserRepository.createUser(req.body);
    if (!user) {
      throw new HttpError(`There is no user with the id ${req.params.id} `, 404);
    }
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    await UserRepository.removeUser(req.params.id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await UserRepository.getUserByID(req.params.id);
    if (!user) {
      throw new HttpError(`There is no user with the id ${req.params.id} `, 404);
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const allusers = await UserRepository.getUserAll();
    res.json(allusers);
  } catch (err) {
    next(err);
  }
}
