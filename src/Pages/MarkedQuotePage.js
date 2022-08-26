import { useState } from "react";
import { useContext } from "react";
import { Fragment } from "react";
import { Link, Route, useParams } from "react-router-dom";
import MarkedQuote from "../components/AllQuotes/MarkedQuote";
import Comments from "../components/Comments/Comments";
import "../index.css";
import QuotesContext from "../store/quotes-context";

const MarkedQuotePage = (props) => {
  const [commentIsHidden, setCommentsIsHidden] = useState(true);
  const quotesCtx = useContext(QuotesContext);
  const params = useParams();
  let currentQuote;

  if (quotesCtx.allQuotes) {
    currentQuote = quotesCtx.allQuotes.find(
      (quoteItem) => params.quoteId === quoteItem._id
    );
  }

  if (!currentQuote && !quotesCtx.isLoading) {
    return (
      <Fragment>
        <div className="centered">
          <h1>There is no such quote...</h1>
          <Link className="btn" to="/quotes">
            Back
          </Link>
        </div>
      </Fragment>
    );
  } else if (quotesCtx.isLoading) {
    return (
      <div className="loading centered">
        <h1>Loading...</h1>
      </div>
    );
  } else
    return (
      <Fragment>
        <MarkedQuote
          quote={currentQuote.content}
          auther={currentQuote.author}
          _id={currentQuote._id}
        />

        <div className="centered">
          {commentIsHidden ? (
            <Link
              className="btn_flat"
              to={`/quotes/${params.quoteId}/comments`}
              onClick={() => setCommentsIsHidden(false)}
            >
              Comments
            </Link>
          ) : (
            <Link
              className="btn_flat"
              to={`/quotes/${params.quoteId}`}
              onClick={() => setCommentsIsHidden(true)}
            >
              Hide
            </Link>
          )}
          <Route path={`/quotes/${params.quoteId}/comments`}>
            <Comments quote={currentQuote} />
          </Route>
        </div>
      </Fragment>
    );
};

export default MarkedQuotePage;
