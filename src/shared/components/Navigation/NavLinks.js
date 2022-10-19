import { Fragment, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useStore } from "../../hooks-store/store";
import "./NavLinks.css";

const NavLinks = (props) => {
  const [state, dispatch] = useStore();
  const history = useHistory();

  const handleLogout = () => {
    dispatch("logout");
    history.push("/quotes");
  };
  console.log(state);
  return (
    <Fragment>
      <nav className="navlinks">
        {state.token ? (
          <ul className="nav-list">
            <li>
              <button className="btn" id="logout" onClick={handleLogout}>
                LOGOUT
              </button>
            </li>
            <li>
              <NavLink
                exact
                to="/new-quote"
                className="btn"
                id="new-quote"
                activeClassName="active"
              >
                New Quote
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/"
                className="btn"
                id="all-quotes"
                activeClassName="active"
              >
                All Quotes
              </NavLink>
            </li>

            <li>
              <NavLink
                exact
                to={`/my-account`}
                className="btn"
                id="my-account"
                activeClassName="active"
              >
                My-Account
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav-list">
            <li>
              <NavLink
                to="/auth"
                exact
                className="btn"
                id="auth"
                activeClassName="active"
              >
                Authentication
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                exact
                className="btn"
                id="all-quotes"
                activeClassName="active"
              >
                All Quotes
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </Fragment>
  );
};

export default NavLinks;
