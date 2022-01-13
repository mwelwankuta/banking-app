import React, { useContext } from 'react';
import { registerContext } from '../../context/register';

import Avatar from './Avatar';
import Form from './Form';

function Register() {
  const { step } = useContext(registerContext);

  if (step === 0) {
    return <Form />;
  } else {
    return <Avatar />;
  }
}

export default Register;
