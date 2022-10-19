import { Fragment, useState } from "react";
import "./Header.css";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UI/Backdrop";
import { useStore } from "../../hooks-store/store";

const Header = (props) => {
  const state = useStore()[0];
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };
  return (
    <Fragment>
      {drawerIsOpen && <SideDrawer onClick={handleDrawerClose} />}
      <div className="header">
        <div className="nav-bar">
          <h1 className="title">MyQuotes</h1>
          <button className="sidedrawer-btn" onClick={handleDrawerOpen}>
            <span />
            <span />
            <span />
          </button>
          <div className="user-panel">
            <div className="nav-bar-fullscreen">
              <NavLinks />
            </div>
          </div>
        </div>

        <div className="wellcome-card">
          <h3>
            {`Wellcome
             ${state.token ? state.currentUser.username : "User"} !`}
          </h3>
          <div className="bookmark">
            <div className="bookmark2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
