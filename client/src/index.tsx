import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { AuthProvider } from './provider/AuthProvider'

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}


ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <App /> 
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
