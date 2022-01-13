import React from 'react';
import Container from '../../Container';

function HeaderPlaceholder() {
  return (
    <Container
      className='flex flex-col items-center text-gray-900 bg-gray-50 pb-8'
      style={{ height: 100.5 }}
    >
      <div className='flex items-baseline font-semibold'>
        <div className='text-xl mr-1 h-5 w-5 p-2 bg-gray-200 animate-pulse'></div>
        <div className='text-4xl h-10 w-16 bg-gray-200 p-5 animate-pulse'></div>
        <div className='text-xl ml-1 h-5 w-5 p-2 bg-gray-200 animate-pulse'></div>
      </div>
      <div className='mt-2 text-sm text-gray-600'>
        <p>
          <div className='mt-2 text-xl h-4 w-32 p-1.5 bg-gray-200 animate-pulse'></div>
        </p>
      </div>
    </Container>
  );
}

export default HeaderPlaceholder;
