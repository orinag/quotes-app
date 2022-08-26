import "./Comments.css";

import { useState } from "react";
import { Fragment } from "react";
import CommentsForm from "./CommentsForm";
import Modal from "../UI/Modal";

const Comments = (props) => {
  const [formDisplay, setFormDisplay] = useState(false);
  const comments = props.quote.comments.map((item) => (
    <li className="single-comment">
      <h6>10/02/22</h6>
      <h1>{item.comment}</h1>
      <p>-{item.name}</p>
    </li>
  ));
  const handleSend = () => {
    setFormDisplay(false);
  };
  return (
    <>
      {formDisplay && (
        <Modal
          header={"New Comment"}
          onClick={() => setFormDisplay(false)}
          button={"Discard"}
          content={
            <CommentsForm id={props.quote._id} handleSend={handleSend} />
          }
        />
      )}
      <div className="comments">
        <ul>{comments}</ul>
        <button onClick={() => setFormDisplay(true)}>Add Comment</button>
      </div>
    </>
  );
};

export default Comments;
