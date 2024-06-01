import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from "./store/localStorage.jsx";
import Header from "./components/Header.jsx";
import PostResult from "./components/postResult.jsx";
import NotFound from "./components/NotFound.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./store/privateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/result" element={<PrivateRoute><PostResult /></PrivateRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Root = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Router>
          <Header />
          <AppRoutes />
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
