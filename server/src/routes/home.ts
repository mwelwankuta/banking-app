import {Router} from 'express';
import {checkAuthentication} from '../utils';
import {Accounts, Home} from '../controllers';

// eslint-disable-next-line new-cap
const router = Router();

router.get('/home', checkAuthentication, Home);
router.get('/accounts', checkAuthentication, Accounts);

export {router as home};
