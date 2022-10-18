import NavLinks from "./NavLinks";
import "./SideDrawer.css";

const SideDrawer = (props) => {
  return (
    <aside className="sidedrawer">
      <NavLinks />
    </aside>
  );
};

export default SideDrawer;
