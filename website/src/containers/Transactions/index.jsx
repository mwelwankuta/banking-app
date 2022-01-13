import { CashIcon } from '@heroicons/react/solid';
import React, { useContext, useEffect, useState } from 'react';

import Container from '../../components/Container';
import TextField from '../../ui/TextField';

import { Send } from '../../apis/transactions';
import { userContext } from '../../context/user';
import { ROUTES } from '../../constants';

function Transactions({ history }) {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState('');

  const [submitting, setSubmitting] = useState(true);
  const [error, setErrors] = useState('');

  const [message, setMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const { user } = useContext(userContext);

  const onSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);
    // send to backend

    if (!receiver || !amount) {
      setErrors('all fields are required');
      setSubmitting(false);
      return;
    }

    try {
      const response = await Send({ from: user.account, to: receiver, amount });
      setMessage(response.message);
      setTransactionId(response.transaction_id);

      setTimeout(() => {
        if (response.balance) history.push(ROUTES.home);
      }, 3000);
      console.log(response);
    } catch (error) {
      console.log(error, 'error');
    }
    setSubmitting(false);
  };

  // on change event for receiver input
  const receiverChange = ({ target }) => {
    setReceiver(target.value);
    setErrors('');
  };

  //  on change event for amount input
  const amountChange = ({ target }) => {
    setAmount(target.value);
    setErrors('');
  };

  useEffect(() => {
    if (receiver.length === 12 && amount) {
      setSubmitting(false);
    } else {
      setSubmitting(true);
    }
  }, [amount, receiver.length]);

  return (
    <Container className='px-4 mt-10'>
      <div className='mb-4'>
        <h1 className='font-semibold text-xl text-gray-900'>Send Money</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='amount'>
            <span className='text-sm text-gray-600'>Amount</span>
            <TextField
              type='number'
              id='amount'
              className='mt-1 mb-2'
              value={amount}
              onChange={amountChange}
            />
            <span className='text-sm text-red-600'>{error}</span>
          </label>
        </div>
        <div>
          <label htmlFor='receiver'>
            <span className='text-sm text-gray-600'>Receiver</span>
            <TextField
              type='text'
              id='receiver'
              className='mt-1 mb-2'
              value={receiver}
              onChange={receiverChange}
            />
            <span className='text-sm text-red-600'>{error}</span>
          </label>
        </div>
        <button
          disabled={submitting}
          className='mt-2 px-4 py-1.5 rounded-md flex items-center w-full justify-center text-white bg-pink-600'
          style={{ opacity: submitting ? 0.5 : 1 }}
        >
          <p className='mr-2'>Send</p>
          <CashIcon height={20} />
        </button>
      </form>
      {message && transactionId && (
        <div className='mt-4'>
          <p className='text-green-600'>{message}</p>
          <p className='mt-2'>Transaction Id: {transactionId}</p>
        </div>
      )}
    </Container>
  );
}

export default Transactions;
