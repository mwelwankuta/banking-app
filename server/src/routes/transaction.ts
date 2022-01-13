import {Router} from 'express';
import {checkAuthentication} from '../utils';
import {Send} from '../controllers';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/send', checkAuthentication, Send);

export {router as transaction};
