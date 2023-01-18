import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  userId: '',
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const storedUsername = localStorage.getItem('username');
  const storedUserId = localStorage.getItem('userId');
  const storedIsAdmin = localStorage.getItem('isAdmin');
  const storedName = localStorage.getItem('name');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    username: storedUsername,
    userId: storedUserId,
    isAdmin: storedIsAdmin,
    name: storedName,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken;
  let initialUsername;
  let initialUserId;
  let initialIsAdmin;
  let initialName;

  if (tokenData) {
    initialToken = tokenData.token;
    initialUsername = tokenData.username;
    initialUserId = tokenData.userId;
    initialIsAdmin = tokenData.isAdmin;
    initialName = tokenData.name;
  }

  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);
  const [userId, setUserId] = useState(initialUserId);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [name, setName] = useState(initialName);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUsername(null);
    setUserId(null);
    setIsAdmin(null);
    setName(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('name');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, data, isAdmin, name) => {
    setToken(token);
    setUsername(data.email);
    setUserId(data.localId);
    setIsAdmin(isAdmin);
    setName(name);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('username', data.email);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('name', name);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    userId: userId,
    username: username,
    isAdmin: isAdmin,
    name: name,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
