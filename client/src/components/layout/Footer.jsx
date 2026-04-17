import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        {/* Left Section */}
        <div className="mb-3 md:mb-0">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>

        {/* Center Section */}
        <div className="flex space-x-6">
          <Link to="/privacy-policy" className="hover:text-blue-600 transition">
            Privacy Policy
          </Link>

          <Link to="/terms" className="hover:text-blue-600 transition">
            Terms & Conditions
          </Link>

          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="mt-3 md:mt-0">Built with React + Tailwind ⚡</div>
      </div>
    </footer>
  );
};

export default Footer;
