import { useCallback, useEffect, useState } from "react";
import { useStore } from "../hooks-store/store";

let logoutTimer;

const useAuth = () => {
  const dispatch = useStore()[1];
  const [token, setToken] = useState();
  const [tokenExpTime, setTokenExpTime] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((user, token, expTime) => {
    setToken(token);
    setUserId(user.userId);
    const tokenExpTime =
      expTime || new Date(new Date().getTime() + 1000 * 60 * 60);

    setTokenExpTime(tokenExpTime);
    dispatch("login", { ...user, token });
    localStorage.setItem(
      "userData",
      JSON.stringify({
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
        },
        token: token,
        expiration: tokenExpTime,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpTime) {
      const remainingTime = tokenExpTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpTime]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.user, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  return [token, login, logout, userId];
};

export default useAuth;
