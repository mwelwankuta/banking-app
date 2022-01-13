import React, { useContext } from 'react';
import Container from '../Container';

import { formatMoney } from '../../utils';
import { userContext } from '../../context/user';

function Header({ balance }) {
  const { user } = useContext(userContext);

  const amount = balance.toString().split('.');
  const secondaryAmount = amount[1] || 0;

  let mainAmount = amount[0];

  return (
    <Container
      className='flex flex-col items-center text-gray-900 bg-gray-50 pb-8'
      style={{ height: 100.5 }}
    >
      <div className='text-gray-600 flex items-center-'>
        <p className='mr-2'>Account </p>
        <p className='font-semibold text-base text-center'>#{user.account}</p>
      </div>
      <div className='flex items-baseline font-semibold'>
        <h3 className='text-xl mr-1'>$</h3>
        <h2 className='text-4xl'>{formatMoney(mainAmount)}</h2>
        <h3 className='text-xl'>.{secondaryAmount}</h3>
      </div>
    </Container>
  );
}

export default Header;
