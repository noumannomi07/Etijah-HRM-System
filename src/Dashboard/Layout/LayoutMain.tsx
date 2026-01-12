import { Outlet } from "react-router-dom";
import NavBarDashboard from "../Components/NavBarDashboard/NavBarDashboard";
import PropTypes from "prop-types";

const LayoutMain = ({ activeOpen, toggleSidebar }) => {
  return (
    <div
      className={`
      layout-pages   pr-[15px] 
      d-flex  flex-column  ${activeOpen ? "activeOpen" : ""}`}
    >
      <header>
        <NavBarDashboard toggleSidebar={toggleSidebar}  />
      </header>

      <main>
        <div className="mb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

LayoutMain.propTypes = {
  activeOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

export default LayoutMain;
