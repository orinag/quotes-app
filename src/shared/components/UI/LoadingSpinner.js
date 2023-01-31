import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return ReactDOM.createPortal(
    <Backdrop>
      <div className="spinner"></div>
    </Backdrop>,
    document.getElementById("loading-spinner-hook")
  );
};

export default LoadingSpinner;
