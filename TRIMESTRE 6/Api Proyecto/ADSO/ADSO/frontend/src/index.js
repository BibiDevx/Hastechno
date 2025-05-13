import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthProvider } from './context/AuthContext'; // 👈 Importa el contexto

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider> {/* 👈 Envuelve la app */}
      <App />
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
