import { useEffect } from "react";

import "./AllQuotes.css";
import SingleQuote from "./SingleQuote";
import { useStore } from "../../../shared/hooks-store/store";
import useHttp from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";

const AllQuotes = () => {
  const state = useStore()[0];
  const [sendGetReq, isLoading, err, resetErr] = useHttp();

  useEffect(() => {
    sendGetReq("GETQUOTES", { url: "http://localhost:5000/api/quotes" });
  }, []);

  const handleTryAgain = () => {
    resetErr();
    sendGetReq("GETQUOTES", { url: "http://localhost:5000/api/quotes" });
  };

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
        <ul>
          {state.quotes.map((item) => {
            return (
              <li key={item.id}>
                <SingleQuote
                  key={item.id}
                  id={item.id}
                  quote={item.content}
                  auther={item.author}
                  creatorId={item.creator}
                  creatorName={item.creatorName}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AllQuotes;
