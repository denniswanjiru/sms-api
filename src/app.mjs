import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger.json';
import MessagesRouter from './routes/messages';
import ContactsRouter from './routes/contacts';
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
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// Resources
app.use(
  '/api/v1/messages',
  UtilMiddleware.authenticate,
  MessagesRouter
);

app.use(
  '/api/v1/contacts',
  UtilMiddleware.authenticate,
  ContactsRouter
);

app.use('/api/v1/user', UserRouter);

// Error Handling
app.use(ErrorHandler.customError);
app.use(ErrorHandler.handleError);

export default app;
