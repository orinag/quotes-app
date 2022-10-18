import "./Backdrop.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}>
      {props.children}
    </div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
