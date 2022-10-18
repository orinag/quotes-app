import { Fragment, useState } from "react";

import "./SingleQuote.css";
import useHttp from "../../../shared/hooks/http-hook";
import { useStore } from "../../../shared/hooks-store/store";
import Backdrop from "../../../shared/components/UI/Backdrop";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Card from "../../../shared/components/UI/Card";
import Modal from "../../../shared/components/UI/Modal";

const SingleQuote = (props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteReq, isLoading, err, clearErr] = useHttp();
  const state = useStore()[0];
  console.log(props.creatorId);
  console.log(state);
  const deleteModalHandle = () => {
    setDeleteModal(true);
  };
  const deleteHandle = () => {
    setDeleteModal(false);
    deleteReq("DELETE", {
      url: `http://localhost:5000/api/quotes/${props.id}/delete-quote`,
      method: "DELETE",
      body: null,
      headers: { Authorization: "Bearer " + state.token },
    });
  };
  return (
    <Fragment>
      {(deleteModal || err) && (
        <Backdrop>
          <Modal
            content={
              err ? err.message : "Are you sure you want to delete this Quote?"
            }
            button={err ? "OK" : "Yes"}
            onClick={
              err
                ? () => {
                    clearErr();
                  }
                : deleteHandle
            }
          />
        </Backdrop>
      )}
      {isLoading && (
        <Backdrop className="centered">
          <LoadingSpinner />
        </Backdrop>
      )}
      <div className="details">
        <p className="username">uploaded by {props.creatorName} at</p>
        <Card className="quote">
          <blockquote className="border-bottom">
            <strong className="mark-top">❝</strong>
            <br />
            <h1> {props.quote}</h1>

            <br />
            <strong className="mark-bot">❞</strong>
          </blockquote>

          {props.creatorId === state.currentUser.userId && (
            <div className="actions">
              <button
                type="button"
                className="delete"
                id={`${props.id} delete`}
                onClick={deleteModalHandle}
              >
                🚫
              </button>
            </div>
          )}
        </Card>
      </div>
      <h6 className="author">-{props.auther}</h6>
    </Fragment>
  );
};

export default SingleQuote;
