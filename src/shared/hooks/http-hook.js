import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../hooks-store/store";
import useAuth from "./auth-hook";

const useHttp = () => {
  const [token, login, logout, userId] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();
  const dispatch = useStore()[1];
  const history = useHistory();

  const clearErr = () => {
    console.log("RESETTING ERROR!");
    setErr(null);
  };

  const sendReq = useCallback(
    async (actionKey, regConfig) => {
      setErr(null);
      try {
        setIsLoading(true);
        console.log("Starting " + actionKey);

        const response = await fetch(
          regConfig.url,
          regConfig.method && {
            method: regConfig.method ? regConfig.method : "GET",
            body: regConfig.body ? regConfig.body : {},
            headers: regConfig.headers ? regConfig.headers : null,
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        switch (actionKey) {
          case "GETQUOTES":
            dispatch("getQuotes", responseData.quotes);

            break;

          case "ADD":
            dispatch("addQuote", responseData.newQuote);
            history.go("/quotes");

            break;

          case "DELETE":
            dispatch("deleteQuote", responseData.message);
            if (response.ok) {
              history.go("/quotes");
            }
            break;

          case "SIGNUP":
            dispatch("signUp", responseData.user);
            login(responseData.user, responseData.user.token);
            history.push("/quotes");
            break;

          case "LOGIN":
            dispatch("login", responseData.user);

            login(responseData.user, responseData.user.token);
            history.push("/quotes");
            break;

          case "GETUSERS":
            dispatch("getUsers", responseData.users);
            break;

          case "GETUSER":
            dispatch("getUserById", responseData.user);
            break;

          case "GETUSERQUOTES":
            dispatch("getQuotesByUser", responseData.userQuotes);
            break;

          case "DELETEUSER":
            if (response.ok) {
              dispatch("logout");
              logout();
              history.push("/quotes");
            }
            break;

          default:
            break;
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        setErr(err);
      }
    },
    [dispatch]
  );

  return [sendReq, isLoading, err, clearErr];
};

export default useHttp;
