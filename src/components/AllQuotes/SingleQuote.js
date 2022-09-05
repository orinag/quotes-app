import "./SingleQuote.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const SingleQuote = (props) => {
  return (
    <Fragment>
      <figure className="quote">
        <Link to={`/quotes/${props.id}`}>
          <blockquote>
            <strong className="mark-top">❝</strong>
            <br />
            <h1> {props.quote}</h1>

            <br />
            <strong className="mark-bot">❞</strong>
          </blockquote>
          <p>-{props.auther}</p>
        </Link>
      </figure>
    </Fragment>
  );
};

export default SingleQuote;
