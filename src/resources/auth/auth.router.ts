import { Router } from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser } from './auth.service';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Your email is not valid.').isEmail(),
    check('password', 'Your password should be min 8 and max 14, also should contain special characters')
      .isLength({ min: 8, max: 14 })
      .isAlphanumeric(),
  ],
  loginUser
);
router.post(
  '/register',
  [
    check('email', 'Enter the valid email').isEmail(),
    check('password', 'Your password should be min 8 and max 14, also should contain special characters')
      .isLength({ min: 8, max: 14 })
      .isAlphanumeric(),
    check('role', 'You can choose only one of these roles: ADMIN or USER').isIn(['ADMIN', 'USER']),
  ],
  registerUser
);

export default router;
