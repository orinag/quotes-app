import "./AllQuotes.css";
import SingleQuote from "./SingleQuote";
import { useContext } from "react";
import QuotesContext from "../../store/quotes-context";

const AllQuotes = (props) => {
  const quotesCtx = useContext(QuotesContext);

  return (
    <div className="quote-list">
      {quotesCtx.isLoading ? (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      ) : (
        <ul>
          {quotesCtx.allQuotes &&
            quotesCtx.allQuotes.map((item) => {
              return (
                <li>
                  <SingleQuote
                    id={item._id}
                    quote={item.content}
                    auther={item.author}
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
