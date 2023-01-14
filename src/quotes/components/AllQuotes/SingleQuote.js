import { Fragment, useState } from "react";

import "./SingleQuote.css";
import useHttp from "../../../shared/hooks/http-hook";
import { useStore } from "../../../shared/hooks-store/store";
import Backdrop from "../../../shared/components/UI/Backdrop";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import Modal from "../../../shared/components/UI/Modal";
import EditForm from "./EditForm";
import { memo } from "react";

const SingleQuote = memo((props) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteReq, isLoading, err, clearErr] = useHttp();
  const [editModal, setEditModal] = useState(false);
  const state = useStore(false)[0];

  const editModalClose = () => {
    setEditModal(false);
  };
  const deleteModalHandle = () => {
    setDeleteModal(true);
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
  };

  const deleteHandle = () => {
    console.log(props);
    setDeleteModal(false);
    deleteReq("DELETE", {
      url: `${process.env.REACT_APP_BACKEND_URL}/quotes/${props.id}/delete-quote`,
      method: "DELETE",
      body: null,
      headers: { Authorization: "Bearer " + state.token },
    });
  };
  return (
    <Fragment>
      <Modal
        onClose={editModalClose}
        className="edit-form"
        show={editModal}
        content={
          <EditForm
            key={props.id}
            id={props.id}
            content={props.content}
            author={props.author}
            creatorId={props.creator}
            creatorName={props.creatorName}
            closeForm={editModalClose}
          />
        }
        button="Discard"
        onClick={editModalClose}
      />
      <Modal
        show={deleteModal}
        content={
          err ? err.message : "Are you sure you want to delete this Quote?"
        }
        button={err ? "OK" : "Yes"}
        onClose={deleteModalClose}
        onClick={
          err
            ? () => {
                clearErr();
              }
            : deleteHandle
        }
      />

      {isLoading && (
        <Backdrop className="centered">
          <LoadingSpinner />
        </Backdrop>
      )}
      <div className="details">
        <p className="username">uploaded by {props.creatorName}</p>
        <div className="quote">
          <blockquote className="blockquote">
            <strong className="mark-top">❝</strong>
            <br />
            <h1> {props.content}</h1>
            <br />
            <strong className="mark-bot">❞</strong>
          </blockquote>

          {props.creatorId === state.currentUser.userId && (
            <div className="actions">
              <button
                id="delete_btn"
                type="button"
                className="btn-warning"
                onClick={deleteModalHandle}
              >
                DELETE
              </button>
              <button
                type="button"
                className="btn_flat"
                id="edit-quote"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                EDIT
              </button>
            </div>
          )}
        </div>
        <h6 className="author">-{props.author}</h6>
      </div>
    </Fragment>
  );
});

export default SingleQuote;
