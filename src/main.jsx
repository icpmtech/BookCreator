import React from 'react';
import ReactDOM from 'react-dom/client';

import GlobalStyles from './GlobalStyles';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './Context/AuthContext';
import App from './App';
import { LogoAnimation } from './styles';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyles>
        
        </GlobalStyles>
        <Toaster />
        <AuthProvider>
       
            <App />
        </AuthProvider>
    </React.StrictMode>
);
