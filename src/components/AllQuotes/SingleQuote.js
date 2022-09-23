import "./SingleQuote.css";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";

const SingleQuote = (props) => {
  const history = useHistory();

  const handleDelete = () => {
    history.push("/quotes");
  };

  return (
    <Fragment>
      <figure className="quote">
        <blockquote className="border-bottom">
          <strong className="mark-top">❝</strong>
          <br />
          <h1> {props.quote}</h1>

          <br />
          <strong className="mark-bot">❞</strong>
        </blockquote>

        <div className="actions">
          <button className="delete">🚫</button>
          <button className="comment">📨</button>
          <button className="add-comment">+</button>
        </div>
      </figure>
      <p className="author">-{props.auther}</p>
    </Fragment>
  );
};

export default SingleQuote;
