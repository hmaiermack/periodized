import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ModalProvider } from './context/ModalContext';
import './index.css'
import { AuthProvider } from './provider/AuthProvider'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}


ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
