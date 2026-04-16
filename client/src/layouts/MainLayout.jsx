import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

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
