import React from 'react';
import ReactDOM from 'react-dom';
import { StatusProjetosApp, AuthedPages } from './status-projetos-app';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(
  <>
    <StatusProjetosApp />
    <AuthedPages />
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();