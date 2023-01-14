import "./Modal.css";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { Fragment } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  const content = (
    <Fragment>
      {props.show ? <Backdrop onClick={props.onClose} show /> : null}
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={300}
        classNames="fade-slide"
      >
        <div className={props.className ? props.className : "modal"}>
          <header className="modal_header">
            <p>{props.header}</p>
          </header>
          <div className="modal_content">
            <h3>{props.content}</h3>
          </div>
          <footer className="modal_footer">
            {props.button && (
              <button className="modal_btn" onClick={props.onClick}>
                {props.button || "Close"}
              </button>
            )}
            <div className="footer_toolbar">{props.footer}</div>
          </footer>
        </div>
      </CSSTransition>
    </Fragment>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;
