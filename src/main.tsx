import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './utils/AuthRoute';
import './i18n'

createRoot(document.getElementById('root')!).render(
  // BrowserRouter 必须在最外层包裹
  <BrowserRouter>
    <AuthRoute >
      <App />
    </AuthRoute>
  </BrowserRouter>
)
