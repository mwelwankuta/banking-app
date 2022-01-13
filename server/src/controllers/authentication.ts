import path from 'path';
import {Response, Request} from 'express';
import {compare, genSalt, hash} from 'bcrypt';
import {randomInt} from 'crypto';
import {UploadedFile} from 'express-fileupload';
import {randomBytes} from 'crypto';

import {User as UserModel, Account as AccountModel} from '../models';
import {generateToken} from '../utils/token';

import type {LoginInput, User} from './types/User';

/**
 * authenticate user
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function Login(req: Request, res: Response): Promise<void> {
  const body: LoginInput = req.body;
  console.log(req.body, 'BODY');

  if (!body) {
    res.status(500).send({message: 'user is invalid'});
    return;
  }

  const user: User = await UserModel.findOne({email: body.email});

  if (!user) {
    res.status(404).send({message: 'user does not exist'});
    return;
  }

  const passwordIsCorrect = await compare(body.password, user.password);
  if (passwordIsCorrect) {
    const token = generateToken({user: user.id, account: user.account});
    res.send({
      first_name: user.firstname,
      last_name: user.lastname,
      account: user.account,
      avatar: user.avatar,
      token,
    });
  } else {
    res.status(401).send({message: 'email or password is incorrect'});
  }
}

/**
 * register user account
 * @param {Request} req
 * @param {Response} res
 * @return {Promise<void>}
 */
export async function Register(req: Request, res: Response): Promise<void> {
  const body: User = req.body;
  const avatar: UploadedFile | any = req.files?.file;

  console.log(body, 'BODY');
  if (!avatar) {
    res.status(400).send({
      message: 'an avatar is required',
    });
    return;
  }

  const fileName =
    randomBytes(32).toString('hex') + '.' + avatar.mimetype.split('/')[1];

  const user = await UserModel.findOne({email: body.email});

  if (user) {
    res.status(400).send({message: 'user already exists'});
    return;
  }

  const saltRounds = await genSalt(10);
  const password = await hash(body.password, saltRounds);
  await avatar.mv(path.join('public', 'avatars', fileName));

  const accNumber = randomInt(123456789876, 987654321768);
  const createdUser: User =
    await UserModel.create({
      ...body,
      password,
      avatar: fileName,
      account: accNumber,
    });

  await AccountModel.create({
    user_id: createdUser.id,
    account: accNumber,
  }); // balance

  res.send({message: 'registered successfully created', email: body.email});
}
