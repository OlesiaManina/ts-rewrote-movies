import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { App } from './components/App';
import './index.css';
  // "homepage": "https://OlesiaManina.github.io/goit-react-hw-05-movies/",

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

