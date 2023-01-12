import { Fragment, useCallback, memo } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../hooks-store/store";
import useAuth from "../../hooks/auth-hook";
import "./NavLinks.css";

const NavLinks = memo((props) => {
  console.log("RENDER");
  const logout = useAuth()[2];
  const [state, dispatch] = useStore(false);

  const handleLogout = useCallback(() => {
    console.log("HELLO");
    dispatch("logout");
    logout();
  }, [logout, dispatch]);

  return (
    <Fragment>
      <nav className="navlinks" onClick={props.onClick}>
        {state.token ? (
          <ul className="nav-list" onClick={props.handle}>
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
});

export default NavLinks;
