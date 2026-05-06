import React from "react";
import Profile from "./Profile";
import { Link, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div>
      {/* Account */}
      {/* <Profile /> */}
      <ul>
        <li>
          <Link to="/accountinformation">Account Information</Link>
        </li>
        <li>
          <Link to="/myorder">My Order</Link>
        </li>
        <li>
          <Link to="/addressmanagement">Address Management</Link>
        </li>
        <li>
          <Link to="/passwordmanager">Password Manager</Link>
        </li>
      </ul>
    </div>
  );
};

export default Account;
