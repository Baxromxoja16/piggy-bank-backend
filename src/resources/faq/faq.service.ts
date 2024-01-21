import { NextFunction, Request, Response } from 'express';
import Faq from './faq.model';

export async function getAllFaqs(req: Request, res: Response, next: NextFunction) {
  try {
    const faqs = await Faq.find({}).exec();
    res.json(faqs);
  } catch (err) {
    next(err);
  }
}

export async function getFaqById(req: Request, res: Response, next: NextFunction) {
  try {
    const faq = await Faq.findById(req.params.id);
    res.json(faq);
  } catch (err) {
    next(err);
  }
}

export async function createFaq(req: Request, res: Response, next: NextFunction) {
  try {
    const faq = await Faq.create(req.body);
    res.json(faq);
  } catch (err) {
    next(err);
  }
}

export async function updateFaq(req: Request, res: Response, next: NextFunction) {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(faq);
  } catch (err) {
    next(err);
  }
}

export async function deleteFaq(req: Request, res: Response, next: NextFunction) {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
