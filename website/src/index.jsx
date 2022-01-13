import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './containers/App';
import UserProvider from './context/user/UserProvider';
import RegisterProvider from './context/register/RegisterProvider';

import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <RegisterProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RegisterProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('app')
);

serviceWorker.register();
