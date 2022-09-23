import { useCallback, useEffect, useState } from "react";
import { useStore } from "../hooks-store/store";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState();
  const dispatch = useStore()[1];

  const clearErr = () => {
    setErr(null);
  };

  const sendReq = useCallback(
    async (regConfig, actionKey) => {
      try {
        setIsLoading(true);
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
          case "GETALL":
            dispatch("getQuotes", responseData.quotes);
            break;
          case "ADD":
            dispatch("addQuote", responseData.newQuote);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        setErr(err);
      }
    },
    [dispatch]
  );

  return [sendReq, isLoading, err, clearErr];
};

export default useHttp;
