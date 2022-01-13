import {randomInt} from 'crypto';
import type {Response} from 'express';

import {
  Account as AccountModel,
  Transaction as TransactionModel,
} from '../models';

import type {Request} from '../types';
import type {Transaction, Account} from './types';

/**
 * transfer money from one account to another
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function Send(req: Request, res: Response): Promise<void> {
  const transaction: Transaction = req.body;
  // check logged in user

  if (req.account != transaction.from) {
    res.status(401).send('you can not complete this transfer.');
    return;
  }

  // check account balance
  const account: Account = await AccountModel.findOne({user_id: req.user});
  if (transaction.amount > account.balance) {
    res.status(400)
        .send({message: 'account balance too low to make transaction'});
    return;
  }
  const transactionAmount = parseFloat(transaction.amount.toString());

  // change balances
  await AccountModel.findOneAndUpdate(
      {user_id: req.user},
      {balance: account.balance - transactionAmount},
  );

  const receiver: Account = await AccountModel.findOne({
    account: transaction.to,
  });

  if (!receiver) {
    res.send({message: 'account you are trying to send to does not exist'});
    return;
  }

  await AccountModel.findOneAndUpdate(
      {account: transaction.to},
      {balance: receiver.balance + transactionAmount},
  );

  // save transaction to table
  const transactionId = randomInt(1234567898765, 9876543212345);

  await TransactionModel.create({
    ...transaction,
    transaction_id: transactionId,
  });

  // send response
  res.send({
    message:
        `successfully transferred ${transaction.amount} to ${transaction.to}`,
    total: account.balance - transaction.amount,
    transaction_id: transactionId,
  });
}
