import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData , setuserData] = useState({});

  const storeLsToken = (newToken) => {
    try {
      localStorage.setItem('token', newToken);
      setToken(newToken);
      console.log('successfull storage of token');
    } catch (error) {
      console.error('Failed to store the token:', error);
    }
  };

  const findToken = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  };

  const userAuthentication = async () => {
    if (!token) return;

    try {
      const response = await fetch("https://blog-haven.onrender.com/blog/User", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (!token) {
      findToken();
    }

    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ storeLsToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
