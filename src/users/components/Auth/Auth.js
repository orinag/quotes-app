import { Fragment, useEffect, useState } from "react";

import "./Auth.css";
import SignUp from "./SignUp";
import Login from "./Login";

const Auth = (props) => {
  let card;
  useEffect(() => {
    card = document.getElementById("card");
  }, card);

  const switchHandle = () => {
    card.classList.toggle("is-flipped");
  };

  return (
    <Fragment>
      <div className="scene scene--card">
        <div id="card" className="card">
          <div className="card__face card__face--front">
            <Login switchHandle={switchHandle} />
          </div>
          <div className="card__face card__face--back">
            <SignUp switchHandle={switchHandle} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Auth;
