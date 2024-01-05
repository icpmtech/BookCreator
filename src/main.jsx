import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import netlifyIdentity from 'netlify-identity-widget';
window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
