import React, { useContext, useEffect, useState } from 'react';
import Container from '../../Container';

import { formatDate } from '../../../utils';
import { userContext } from '../../../context/user';

// formatted amount
const Amount = ({ mainAmount, secondaryAmount }) => (
  <div className='text-green-500 flex items-baseline text-base  font-mono'>
    <p className=' text-2xl '>+{mainAmount}</p>
    <p>
      {'.'}
      {secondaryAmount}
    </p>
  </div>
);

function TransactionCard({ date, amount, from, to }) {
  const [color, setColor] = useState('rgb(16, 185, 129)');
  const { user } = useContext(userContext);

  const stringedAmount = amount.toString().split('.');
  const secondaryAmount = stringedAmount[1] || 0;

  let mainAmount = stringedAmount[0];

  useEffect(() => {
    const colors = [
      'rgb(16, 185, 129)',
      'rgb(50,26,120)',
      'rgb(10,100,140)',
      'rgb(160, 0, 100)',
    ];

    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const baseDate = new Date(date);

  return (
    <Container className='flex items-center font-medium mb-5'>
      <div className='flex flex-1 items-center justify-space-between'>
        <div
          className='rounded-md p-2 w-8 h-8 flex items-center justify-center mr-3'
          style={{ backgroundColor: color }}
        >
          <p className='text-white uppercase w-8 h-8 flex items-center justify-center'></p>
        </div>
        <div className='w-full'>
          <p
            className='text-gray-800 truncate w-9/12 font-semibold'
            style={{ fontSize: 16.5 }}
          >
            #{from === user.account ? to : from}
          </p>
          <p className='text-sm font-normal text-gray-500 truncate w-8/12'>
            {formatDate(baseDate)}
          </p>
        </div>
      </div>
      <div>
        {from !== user.account ? (
          <Amount mainAmount={mainAmount} secondaryAmount={secondaryAmount} />
        ) : (
          <Amount mainAmount={mainAmount} secondaryAmount={secondaryAmount} />
        )}
      </div>
    </Container>
  );
}

export default TransactionCard;
