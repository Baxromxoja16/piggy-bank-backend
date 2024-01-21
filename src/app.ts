import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Logger } from './tools/Logger';
import config from './config/config';
import errorHandler from './middlewares/ErrorHandler';
import userRouter from './resources/user/user.router';
import transactionRouter from './resources/transaction/transaction.router';
import accountRouter from './resources/account/account.router';
import statisticRouter from './resources/statistic/statistic.router';
import categoryRouter from './resources/category/category.router';
import subscriptionRouter from './resources/subscription/subscription.router';
import authRouter from './resources/auth/auth.router';
import obligatoryRouter from './resources/obligatory_payment/obligatory.router';
import faqRouter from './resources/faq/faq.router';
import piggyBankRouter from './resources/piggy_bank/piggy.router';
import { jwtCallback } from './resources/auth/auth.repository';
import { connect } from './loader/dbconnect';
import auth from './middlewares/authMiddleware';
import currencyRouter from './resources/currency/currency.router';

const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(Logger);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};
passport.use(new Strategy(opts, jwtCallback));

app.use('/user', auth, userRouter);
app.use('/transaction', auth, transactionRouter);
app.use('/account', auth, accountRouter);
app.use('/statistic', auth, statisticRouter);
app.use('/category', auth, categoryRouter);
app.use('/piggybank', auth, piggyBankRouter);
app.use('/subscription', auth, subscriptionRouter);
app.use('/obligatory', auth, obligatoryRouter);
app.use('/currency', auth, currencyRouter);
app.use('/auth', authRouter);
app.use('/faq', faqRouter);
app.use(errorHandler);

export default app;
