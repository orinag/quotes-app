import "./Modal.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { Fragment } from "react";

const Modal = (props) => {
  const content = (
    <Fragment>
      <Backdrop onClick={props.onClick} />
      <div className="modal">
        <header className="modal_header">
          <p>{props.header}</p>
        </header>
        <div className="modal_content">
          <h3>{props.content}</h3>
        </div>
        <footer className="modal_footer">
          <button onClick={props.onClick}>{props.button || "Close"}</button>
          <div className="footer_toolbar">{props.footer}</div>
        </footer>
      </div>
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;
