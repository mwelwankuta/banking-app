import {Router} from 'express';
import {checkAuthentication} from '../utils';
import {Create} from '../controllers';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/create', checkAuthentication, Create);

export {router as account};

