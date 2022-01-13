import {Schema, model} from 'mongoose';

const Transaction = new Schema(
    {
      from: String,
      to: String,
      amount: {
        type: Number,
        default: 0,
      },
      transaction_id: String,
    },
    {
      timestamps: true,
      autoIndex: true,
    },
);

const transaction = model('transactions', Transaction);
export {transaction as Transaction};
