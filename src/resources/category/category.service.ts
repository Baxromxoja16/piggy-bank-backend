import { NextFunction, Request, Response } from 'express';

import Category from './category.model';

export async function getAllCategories(req: Request, res: Response, next: NextFunction) {
  try {
    // const categories = await Category.find({}).cache({key: req.user?.id});
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

export async function getCategoryById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    // const category = await Category.findById(id).cache({key: req.user?.id});
    const category = await Category.findById(id);
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
