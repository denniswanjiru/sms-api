import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import ApprovalsRouter from './routes/approvals';
import RequestsRouter from './routes/requests';
import ErrorHandler from './middlewares/error';
import UserRouter from './routes/user';
import UtilMiddleware from './middlewares/utilMiddlewares.mjs';

const app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Resources
app.use(
  '/api/v1/approvals',
  UtilMiddleware.authenticate,
  UtilMiddleware.checkUserRole(["admin"]),
  ApprovalsRouter
);

app.use(
  '/api/v1/requests',
  UtilMiddleware.authenticate,
  UtilMiddleware.checkUserRole(["requester", "admin"]),
  RequestsRouter
);

app.use('/api/v1/user', UserRouter);

// Error Handling
app.use(ErrorHandler.customError);
app.use(ErrorHandler.handleError);

export default app;
