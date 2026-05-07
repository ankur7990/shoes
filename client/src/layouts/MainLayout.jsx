import Footer from "../com/Footer";
import Navbar from "../com/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      {/* {children} */}
      <Outlet />
      <Footer />
    </div>
  );
}
export default MainLayout;
