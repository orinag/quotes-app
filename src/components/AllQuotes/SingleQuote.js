import "./SingleQuote.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const SingleQuote = (props) => {
  return (
    <Fragment>
      <figure className="quote">
        <Link to={`/quotes/${props.id}`}>
          <blockquote>"{props.quote}"</blockquote>
          <p>-{props.auther}</p>
        </Link>
      </figure>
    </Fragment>
  );
};

export default SingleQuote;
