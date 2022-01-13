import {Request as ExpressRequest} from 'express';
import {JwtPayload} from 'jsonwebtoken';

export interface Request extends ExpressRequest {
  user?: string | JwtPayload;
  account?: string | JwtPayload;
}
