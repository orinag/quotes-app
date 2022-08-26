import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <nav className="navlinks">
      <ul className="nav-list">
        <li>
          <NavLink to="/new-quote" activeClassName="active">
            New Quote
          </NavLink>
        </li>
        <li>
          <NavLink to="/quotes" activeClassName="active">
            All Quotes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
