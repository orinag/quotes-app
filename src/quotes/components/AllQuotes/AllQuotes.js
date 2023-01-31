import { useCallback, useEffect, memo } from "react";

import "./AllQuotes.css";
import SingleQuote from "./SingleQuote";
import { useStore } from "../../../shared/hooks-store/store";
import useHttp from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";

const AllQuotes = memo(() => {
  console.log("rendering AllQuotes");
  const state = useStore()[0];
  const [sendGetReq, isLoading, err, resetErr] = useHttp();

  useEffect(() => {
    sendGetReq("GETQUOTES", {
      url: process.env.REACT_APP_BACKEND_URL + "/quotes",
    });
  }, []);

  const handleTryAgain = useCallback(() => {
    resetErr();
    sendGetReq("GETQUOTES", {
      url: process.env.REACT_APP_BACKEND_URL + "/quotes",
    });
  }, [sendGetReq, resetErr]);

  return (
    <div className="quote-list">
      {err && (
        <div className="err_notfication">
          {err.message}
          <button className="btn_flat" onClick={handleTryAgain}>
            Try again
          </button>
        </div>
      )}
      {isLoading && !err ? (
        <LoadingSpinner />
      ) : (
        <ul id="quotes-list">
          {state.quotes.map((item, index) => {
            return (
              <li key={item?.id} id={"quote_" + index} className="singleQuote">
                <SingleQuote
                  key={item?.id}
                  id={item?.id}
                  content={item?.content}
                  author={item?.author}
                  creatorId={item?.creator}
                  creatorName={item?.creatorName}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
export default AllQuotes;
