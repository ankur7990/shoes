import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showMenu1, setShowMenu1] = useState(false);

  // Reference for dropdown area
  const menuRef = useRef();
  const menuRefProduct = useRef();
  // const logout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  // };

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
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-bold text-blue-600">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/home">Home</Link>

              {/* <Link to="/product">Product</Link> */}

              {/* Account Dropdown */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Account
                </button>

                {/* Dropdown */}
                {showMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
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
                      onClick={handleLogout}
                      className="block w-full  px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Product Dropdown */}
              <div className="relative" ref={menuRefProduct}>
                <button
                  onClick={() => setShowMenu1(!showMenu1)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  Product
                </button>

                {/* Dropdown */}
                {showMenu1 && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                    <Link
                      to="/category/filter/1"
                      onClick={() => setShowMenu1(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sport Shoes
                    </Link>

                    <Link
                      to="/category/filter/2"
                      onClick={() => setShowMenu1(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Casual Shoes
                    </Link>

                    <Link
                      to="/category/filter/3"
                      onClick={() => setShowMenu1(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sneakers Shoes
                    </Link>
                    <Link
                      to="/category/filter/4"
                      onClick={() => setShowMenu1(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sandle Shoes
                    </Link>
                    <Link
                      to="/category/filter/5"
                      onClick={() => setShowMenu1(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Formal Shoes
                    </Link>

                    {/* <button
                      onClick={handleLogout}
                      className="block w-full  px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button> */}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
