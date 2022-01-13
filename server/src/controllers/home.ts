import {Response} from 'express';

import {Transaction as TransactionModel} from '../models/Transaction';
import {Account as AccountModel} from '../models';

import type {Request} from '../types';
import type {Transaction, Account} from './types';

/**
 * get logged in user account info
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function Home(req: Request, res: Response):Promise<void> {
  const account: Account =
      await AccountModel.findOne({user_id: req.user}); // balance

  if (!account) {
    res.send({message: 'you do not have any accounts at the moment'});
    return;
  }

  // transaction
  const incoming: Transaction[] = await TransactionModel.find({
    to: req.account,
  })
      .sort('desc');

  const outgoing: Transaction[] = await TransactionModel.find({
    from: req.account,
  })
      .sort('desc');

  // send response
  res.send({
    balance: account.balance,
    transactions: [...incoming, ...outgoing]
        .sort((a:any, b:any) => b.createdAt - a.createdAt),
  });
}

/**
 * get logged in user accounts
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function Accounts(req: Request, res: Response):Promise<void> {
  const account: Account[] =
      await AccountModel.find({user_id: req.user}); // balance

  // send response
  res.send({accounts: account});
}
