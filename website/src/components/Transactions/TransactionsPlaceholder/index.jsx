import React from 'react';
import Container from '../../Container';
import TransactionCardPlaceholder from './TransactionCardPlaceholder';

function TransactionsPlaceholder() {
  return (
    <Container className='px-4 py-2 rounded-t-2xl border-t'>
      <div className='flex items-center justify-between text-gray-500 text-sm font-medium mb-1'>
        <div className='p-1.5 h-3 w-16 bg-gray-200 animate-pulse rounded-sm'></div>
        <div className='p-1.5 h-3 w-16 bg-gray-200 animate-pulse rounded-sm'></div>
      </div>
      <div className='mt-2'>
        {/* Transaction Card Placeholders */}
        <TransactionCardPlaceholder />
        <TransactionCardPlaceholder />
        <TransactionCardPlaceholder />
        <TransactionCardPlaceholder />
        <TransactionCardPlaceholder />
        <TransactionCardPlaceholder />
      </div>
    </Container>
  );
}

export default TransactionsPlaceholder;
