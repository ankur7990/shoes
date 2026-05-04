import Footer from "../com/Footer";
import Navbar from "../com/Navbar";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
export default MainLayout;
