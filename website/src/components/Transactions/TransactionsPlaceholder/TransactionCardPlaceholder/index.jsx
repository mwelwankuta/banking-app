import React from 'react';
import Container from '../../../Container';

function TransactionCardPlaceholder() {
  return (
    <Container className='flex items-center font-medium mb-4 bg-gray-50 p-1 rounded-lg'>
      <div className='flex flex-1 items-center justify-space-between'>
        <div className='p-2 w-8 h-8 bg-gray-200 animate-pulse mr-4 rounded-lg'></div>
        <div className='w-full'>
          <div className='p-1 h-4 w-9/12 bg-gray-200 animate-pulse rounded-sm'></div>
          <div className='p-1 h-2 mt-1.5 w-8/12 bg-gray-200 animate-pulse rounded-sm'></div>
        </div>
      </div>
      <div>
        <div className='text-gray-900 text-xl p-1 h-5  w-16 bg-gray-200 animate-pulse rounded-sm'></div>
      </div>
    </Container>
  );
}

export default TransactionCardPlaceholder;
