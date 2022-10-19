import Backdrop from "../UI/Backdrop";
import NavLinks from "./NavLinks";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  return (
    <aside className="sidedrawer">
      <Backdrop onClick={props.onClick}>
        <NavLinks />
      </Backdrop>
    </aside>
  );
};

export default SideDrawer;
