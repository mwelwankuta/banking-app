import {Router} from 'express';
import {Login, Register} from '../controllers';

// eslint-disable-next-line new-cap
const router = Router();

router.post('/login', Login);
router.post('/register', Register);

export {router as authentication};
