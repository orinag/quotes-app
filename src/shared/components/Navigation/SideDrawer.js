import { CSSTransition } from "react-transition-group";
import NavLinks from "./NavLinks";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.drawerIsOpen}
      timeout={300}
      classNames="slide-aside"
    >
      <aside className="sidedrawer">
        <NavLinks onClick={props.handleDrawerClose} />
      </aside>
    </CSSTransition>
  );
};

export default SideDrawer;
