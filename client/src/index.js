import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './index.scss'
import App from './App';
// import reportWebVitals from './reportWebVitals';

// const { createRoot } = ReactDOM
const root = document.getElementById('root')

createRoot(root).render(<BrowserRouter><App /></BrowserRouter>)

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
