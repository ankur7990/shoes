import React from "react";
import Profile from "./Profile";
import { Link, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import AccountInformation from "../pages/AccountInformation";
import MyOrder from "../pages/MyOrder";
import AddressManagement from "../pages/AddressManagement";
import PasswordManager from "../pages/PasswordManager";

const Account = () => {
  return (
    <div>
      {/* Account */}
      {/* <Profile /> */}
      <ul>
        <li>
          {/* <Link to="/accountinformation">Account Information</Link> */}
          <Link
            to="/accountinformation"
            className="text-2xl font-bold text-blue-600"
          >
            Account Info
          </Link>
          {/* <Link to="/home">MyApp</Link> */}
        </li>
        <li>
          {/* <Link to="/myorder">My Order</Link> */}
          <Link to="/myorder" className="text-2xl font-bold text-blue-600">
            My Order
          </Link>
        </li>
        <li>
          {/* <Link to="/addressmanagement">Address Management</Link> */}
          <Link
            to="/addressmanagement"
            className="text-2xl font-bold text-blue-600"
          >
            Address Management
          </Link>
        </li>
        <li>
          {/* <Link to="/passwordmanager">Password Manager</Link> */}
          <Link
            to="/passwordmanager"
            className="text-2xl font-bold text-blue-600"
          >
            {" "}
            Password Manager
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Account;
