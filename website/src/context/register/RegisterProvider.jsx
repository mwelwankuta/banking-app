import React, { useState } from 'react';
import { registerContext } from './index';

function UserProvider({ children }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [step, setStep] = useState(0);

  const registerValues = {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    image,
    setImage,
    step,
    setStep,
  };

  return (
    <registerContext.Provider value={registerValues}>
      {children}
    </registerContext.Provider>
  );
}

export default UserProvider;
