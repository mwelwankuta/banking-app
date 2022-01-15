import React, { useState } from 'react';
import { registerContext } from './index';

function UserProvider({ children }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState({ name: '' });
  const [step, setStep] = useState(0);

  const clear = () => {
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setImage({ name: '' });
    setStep(0);
  };

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
    clear,
  };

  return (
    <registerContext.Provider value={registerValues}>
      {children}
    </registerContext.Provider>
  );
}

export default UserProvider;
