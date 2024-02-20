import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/sign-in", "/sign-up"];

  return (
    <div>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
    </div>
  );
};

export default Layout;
