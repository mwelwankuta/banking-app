import {Schema, model} from 'mongoose';

const Account = new Schema(
    {
      user_id: {
        type: String,
      },
      name: {
        type: String,
        default: 'My Account',
      },
      balance: {
        type: Number,
        default: 0,
      },
      account: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
);

const account = model('accounts', Account);

export {account as Account};
