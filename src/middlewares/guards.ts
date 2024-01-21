import { NextFunction, Request, Response } from 'express';

import User from '../resources/user/user.model';

const addGuard = async function guard(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    const { email }: { email: string } = req.user;
    const [user] = await User.find({ email });
    if (user.role === 'ADMIN') {
      return next();
    }
  }
  return res.status(403).json({ message: 'You are not allowed' });
};

export default addGuard;
