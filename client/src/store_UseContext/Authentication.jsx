import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || ''); // Retrieve token from localStorage on initialization
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false); // Set initial login state based on token presence
  const [userData, setUserData] = useState({});

  const storeLsToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    console.log('Token saved successfully');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserData({});
    setIsLoggedIn(false);
    console.log('User logged out successfully');
  };

  const findToken = () => {
    console.log('findToken called');
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken);
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const userAuthentication = async (token) => {
    console.log('userAuthentication called with token:', token);
    if (!token) {
      console.log('No token found');
      setIsLoggedIn(false);
      return;
    }

    try {
      console.log('Fetching user data');
      const response = await fetch("https://blog-haven.onrender.com/blog/User", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log('User data:', data);
        setUserData(data);
        setIsLoggedIn(true);
      } else {
        console.error('Error fetching user data:', response.statusText);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    console.log('useEffect for findToken');
    findToken();
  }, []);

  useEffect(() => {
    if (token) {
      userAuthentication(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ storeLsToken, logout, isLoggedIn, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
