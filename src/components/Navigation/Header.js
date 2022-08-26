import "./Header.css";
import NavLinks from "./NavLinks";

const Header = (props) => {
  return (
    <div className="header">
      <h1 className="title">MyQuotes</h1>
      <NavLinks />
    </div>
  );
};

export default Header;
