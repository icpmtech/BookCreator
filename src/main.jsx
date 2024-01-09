import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './Context/AuthContext';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Toaster />
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
