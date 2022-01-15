import React from 'react';

function LoadingIndicator({ color = 'white', gap = 'transparent' }) {
  return (
    <div
      className={`border-2 rounded-full h-4 w-4 animate-spin border-${color} p-1`}
      style={{ borderTopColor: gap }}
    ></div>
  );
}

export default LoadingIndicator;
