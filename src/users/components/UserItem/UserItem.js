import { Fragment } from "react";
import { useHistory } from "react-router-dom";

import "./UserItem.css";
import Card from "../../../shared/components/UI/Card";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner";
import { useStore } from "../../../shared/hooks-store/store";
import useHttp from "../../../shared/hooks/http-hook";
import Avatar from "../../../shared/components/UI/Avatar";
import Backdrop from "../../../shared/components/UI/Backdrop";
import Modal from "../../../shared/components/UI/Modal";

const UserItem = (props) => {
  const state = useStore()[0];
  const history = useHistory();
  const [sendDeleteReq, isLoading, err, resetErr] = useHttp();

  const handleDelete = () => {
    sendDeleteReq("DELETEUSER", {
      url: `http://localhost:5000/api/users/${state.currentUser.userId}/delete`,
      method: "DELETE",
      body: null,
      headers: { Authorization: "Bearer " + state.token },
    });
    console.log(err);
    console.log(isLoading);
  };

  return (
    <Fragment>
      {err && (
        <Backdrop
          onClick={() => {
            resetErr();
          }}
        >
          <Modal
            header="error"
            content={err.message}
            button={"Ok"}
            onClick={() => {
              resetErr();
            }}
          >
            Error
          </Modal>{" "}
        </Backdrop>
      )}
      {isLoading ? (
        <Backdrop>
          <LoadingSpinner />
        </Backdrop>
      ) : (
        <Card className="card">
          <div className="avatar_profile">
            <Avatar src="" alt={state.currentUser.username} />
            <div className="user_details">
              <ul className="user-details_box">
                <li>
                  <label>Username: </label>
                  <h6> {state.currentUser.username}</h6>
                </li>
                <li>
                  <label>Email: </label>
                  <h6> {state.currentUser.email}</h6>
                </li>
              </ul>
            </div>
          </div>
          <div className="user_actions">
            <button className="btn">EDIT</button>
            <button
              id="delete-user"
              className="btn-warning"
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        </Card>
      )}
    </Fragment>
  );
};

export default UserItem;
