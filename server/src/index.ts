import cors from 'cors';
import dotenv from 'dotenv';
import express, {json, Response} from 'express';
import mongoose from 'mongoose';
import uploads from 'express-fileupload';

// configure env
dotenv.config();

import {authentication, home, transaction, account} from './routes';
import {Request} from './types';
import {User} from './models';
import {checkAuthentication} from './utils';

const DATABASE_URI =
  process.env.DATABASE_URI || 'mongodb://localhost:27017/shout';

mongoose.connect(DATABASE_URI);
mongoose.connection.on('open', () => {
  // start server after database connected;
  console.log('Database connected...');
  startServer();
});
mongoose.connection.once('error', () => {
  console.log('Failed to connect to database...');
});

/**
 * starts the express server after the database connects
 */
async function startServer() {
  const app = express();

  app.use(json());
  app.use(uploads());
  app.use(cors({origin: '*'}));
  app.use(express.static('public'));

  app.use('/api', home);
  app.use('/api/auth', authentication);
  app.use('/api/account', account);
  app.use('/api/transaction', transaction);
  app.get('/api/user', checkAuthentication,
      async (req:Request, res:Response) => {
        const user = await User.findOne({_id: req.user});
        res.send(user);
      });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}
