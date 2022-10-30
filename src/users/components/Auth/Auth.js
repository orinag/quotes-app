import { Fragment, useEffect, useState } from "react";

import "./Auth.css";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";

const Auth = (props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const switchHandle = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  return (
    <Fragment>
      <div className="scene scene--card ">
        <div
          id="card"
          className={`card auth_card ${isFlipped && "is-flipped"}`}
        >
          <div className="auth_card__face auth_card__face--front">
            <Login switchHandle={switchHandle} />
          </div>
          <div className="auth_card__face auth_card__face--back">
            <SignUp switchHandle={switchHandle} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
