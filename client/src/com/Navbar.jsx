import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import getCategories from "../api/categoryService";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu1, setShowMenu1] = useState(false);
  const [categories, setCategories] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [mobileAccountOpen, setMobileAccountOpen] = useState(false);

  // Reference for dropdown area
  const menuRef = useRef();
  const menuRefProduct = useRef();
  const { cartCount } = useCart();

  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  // };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (error) {
        console.log("Navbar category error:", error);
      }
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (
        menuRefProduct.current &&
        !menuRefProduct.current.contains(event.target)
      ) {
        setShowMenu1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("Navbar cart count:", cartCount);
  }, [cartCount]);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // <nav className="bg-white shadow-md">
    //   <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    //     {/* Logo */}
    //     <Link to="/home" className="text-2xl font-bold text-blue-600">
    //       MyApp
    //     </Link>

    //     {/* Desktop Menu */}
    //     <div className="hidden md:flex items-center space-x-6">
    //       {!token ? (
    //         <>
    //           <Link to="/login">Login</Link>
    //           <Link to="/signup">Signup</Link>
    //         </>
    //       ) : (
    //         <>
    //           <Link to="/home">Home</Link>
    //           <Link to="/products">Products</Link>
    //           {/* Account Dropdown */}
    //           <Link to="/account" className="text-gray-600 hover:text-blue-600">
    //             Account
    //           </Link>

    //           <button onClick={handleLogout} className="text-red-600">
    //             Logout
    //           </button>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold text-blue-600">
          MyApp
        </Link>

        {/* <Link to="/productdetails" className="text-2xl font-bold text-blue-600">
          Product details
        </Link> */}

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="hover:text-blue-600 transition-colors"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Home */}
              <Link
                to="/home"
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </Link>

              {/* AI Shoe Finder */}
              <Link
                to="/ai-finder"
                className="hover:text-blue-600 transition-colors"
              >
                AI Shoe Finder
              </Link>

              {/* Product Dropdown */}
              <div className="relative" ref={menuRefProduct}>
                <button
                  onClick={() => setShowMenu1(!showMenu1)}
                  className="hover:text-blue-600 transition-colors"
                >
                  Products
                </button>

                {showMenu1 && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border py-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/filter/${cat.id}`}
                        onClick={() => setShowMenu1(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {cat.name.replace("\n", " ")}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Account Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="hover:text-blue-600 transition-colors"
                >
                  Account
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border py-2">
                    <Link
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Account Information
                    </Link>

                    <Link
                      to="/myorders"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/addressmanagement"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Address Management
                    </Link>

                    <Link
                      to="/passwordmanager"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Password Manager
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowMenu(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative hover:text-blue-600 transition-colors"
              >
                <span className="text-2xl">🛍️</span>

                {cartCount > 0 && (
                  <span
                    className="
              absolute
              -top-2
              -right-2
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-xs
              text-white
            "
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="flex flex-col p-4 space-y-3">
            {!token ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>

                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Signup
                </Link>
              </>
            ) : (
              <>
                {/* HOME */}
                <Link
                  to="/home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium"
                >
                  Home
                </Link>

                {/* PRODUCTS */}
                <div>
                  <button
                    onClick={() => setMobileProductOpen(!mobileProductOpen)}
                    className="flex w-full items-center justify-between font-medium"
                  >
                    <span>Products</span>

                    <span>{mobileProductOpen ? "▲" : "▼"}</span>
                  </button>

                  {mobileProductOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/category/filter/${cat.id}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setMobileProductOpen(false);
                          }}
                          className="text-gray-600"
                        >
                          {cat.name.replace("\n", " ")}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACCOUNT */}
                <div>
                  <button
                    onClick={() => setMobileAccountOpen(!mobileAccountOpen)}
                    className="flex w-full items-center justify-between font-medium"
                  >
                    <span>Account</span>

                    <span>{mobileAccountOpen ? "▲" : "▼"}</span>
                  </button>

                  {mobileAccountOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2">
                      <Link
                        to="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Account Information
                      </Link>

                      <Link
                        to="/myorders"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Orders
                      </Link>

                      <Link
                        to="/addressmanagement"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Address Management
                      </Link>

                      <Link
                        to="/passwordmanager"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Password Manager
                      </Link>
                    </div>
                  )}
                </div>

                {/* AI SHOE FINDER */}
                <Link
                  to="/ai-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium"
                >
                  AI Shoe Finder
                </Link>

                {/* CART */}
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  🛍️ Cart
                  {cartCount > 0 && (
                    <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* LOGOUT */}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
