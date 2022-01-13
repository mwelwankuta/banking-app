import React, { useState } from 'react';
import Container from '../../Container';

function Avatar({ avatar }) {
  const [error, setError] = useState(false);
  return (
    <Container>
      <img
        src={avatar}
        alt=''
        onError={() => setError(true)}
        className={'rounded-full h-8 w-8 object-cover object-center'}
        style={{ display: error ? 'none' : 'flex' }}
      />
    </Container>
  );
}

export default Avatar;
