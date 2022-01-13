import {Schema, model} from 'mongoose';

const User = new Schema(
    {
      firstname: {
        type: String,
        default: '',
      },
      lastname: {
        type: String,
        default: '',
      },
      email: {
        type: String,
        default: '',
      },
      password: {
        type: String,
        default: '',
      },
      avatar: {
        type: String,
        default: '',
      },
      account: {
        type: String,
      },
    },
    {
      timestamps: true,
      autoIndex: true,
    },
);

const user = model('users', User);
export {user as User};
