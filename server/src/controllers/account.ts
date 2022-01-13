import {Response} from 'express';

import {Account as AccountModel} from '../models';

import type {Request} from '../types';
import type {Account} from './types';

/**
 * transfer money from one account to another
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function Create(req: Request, res: Response): Promise<void> {
  const name = req.body.name;

  const account: Account[] =
      await AccountModel.find({user_id: req.user}); // balance

  if (account.length >= 3) {
    res.status(500).send({message: 'you have reached the account limit'});
    return;
  }
  console.log(req.user, 'request user');
  await AccountModel.create({user_id: req.user, name}); // balance

  // send response
  res.send({
    message: `you successfully created an account`,
    account_name: name,
  });
}
