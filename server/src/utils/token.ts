import jwt, {JwtPayload} from 'jsonwebtoken';
import {NextFunction, Response} from 'express';
import dotenv from 'dotenv';

// configure env
dotenv.config();

import type {Request} from '../types';

const secret = process.env.SECRET_TOKEN;
const tokenSecret = secret || 'fallback_6crytalk3y';

interface TokenPayload {
  user: string | JwtPayload;
  account: string
}

/**
 * @param {string | undefined} user user is
 * @return {string}
 */
export function generateToken(user: TokenPayload): string {
  return jwt.sign(user, tokenSecret);
}

/**
 * @param {string} token jwt token
 * @return {null}
 */
export function verifyToken(token: string) : any {
  try {
    return jwt.verify(token, tokenSecret);
  } catch (error) {
    return null;
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function checkAuthentication(
    req: Request,
    res: Response,
    next: NextFunction,
) {
  const token = req.headers['authorization']!;
  if (!token) {
    res.status(401).send({message: 'invalid token'});
    return;
  }

  const verified: TokenPayload = verifyToken(token);
  if (verified) {
    req.user = verified.user;
    req.account = verified.account;
    next();
  } else {
    res.status(401).send({message: 'authentication problem'});
  }
}
