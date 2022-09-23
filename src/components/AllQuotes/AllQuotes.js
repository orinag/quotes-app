import "./AllQuotes.css";
import SingleQuote from "./SingleQuote";
import { useEffect } from "react";
import { useStore } from "../../hooks-store/store";
import useHttp from "../../hooks/http-hook";
import LoadingSpinner from "../UI/LoadingSpinner";

const AllQuotes = (props) => {
  const state = useStore()[0];
  const [sendGetReq, isLoading] = useHttp();

  useEffect(() => {
    sendGetReq({ url: "http://localhost:5000/quotes" }, "GETALL");
  }, []);

  return (
    <div className="quote-list">
      {!isLoading ? (
        <ul>
          {state.quotes.map((item) => {
            return (
              <li key={item.id}>
                <SingleQuote
                  id={item.id}
                  quote={item.content}
                  auther={item.author}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default AllQuotes;
