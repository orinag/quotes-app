import "./SingleQuote.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const SingleQuote = (props) => {
  return (
    <Fragment>
      <figure className="quote">
        <Link to={`/quotes/${props.id}`}>
          <blockquote className="border-bottom">
            <strong className="mark-top">❝</strong>
            <br />
            <h1> {props.quote}</h1>

            <br />
            <strong className="mark-bot">❞</strong>
          </blockquote>
          <p>-{props.auther}</p>
        </Link>
        <div>
          {" "}
          <span>X</span>
          <span>X</span>
          <span>X</span>
          <span>X</span>
        </div>
      </figure>
    </Fragment>
  );
};

export default SingleQuote;
