import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './store_UseContext/Authentication';
import Loader from './pages/LoadingPage';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn !== undefined) {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return <Loader/>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
