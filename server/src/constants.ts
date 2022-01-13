import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

const constants = {
  clientUrl:
    NODE_ENV == 'production'?
    'https://shout.vercel.app' :
    'https://localhost:3000',
};

export default constants;
