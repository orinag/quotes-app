import { Fragment, useState } from "react";
import "./Header.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Modal from "../UI/Modal";
import Backdrop from "../UI/Backdrop";

const Header = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && (
        <Backdrop onClick={handleDrawerClose}>
          <SideDrawer />
        </Backdrop>
      )}
      <div className="header">
        <h1 className="title">MyQuotes</h1>
        <button className="sidedrawer-btn" onClick={handleDrawerOpen}>
          <span />
          <span />
          <span />
        </button>
        <div className="nav-bar-fullscreen">
          <NavLinks />
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
