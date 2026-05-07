import { useState, useEffect } from "react";
import {
  deleteUserAccount,
  getUserProfile,
  updateUserPassword,
  updateUserProfile,
} from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const PasswordManager = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();
  //fetch profile
  // const fetchProfile = async () => {
  //   try {
  //     const res = await getUserProfile();
  //     console.log(res.data.data);

  //     setUserProfile(res.data.data);
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchProfile();
  // }, []);
  //delete user

  const handleSave = async () => {
    setIsEditing(false);
    console.log("save.");

    // call API here to save updated profile

    // const res = await updateUserProfile(userProfile);
    // const res = await updateUserPassword(userProfile);
    // console.log(res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // if (!userProfile) return <p>Loading profile...</p>;

  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="p-20">
          <h3 className="text-2xl text-white font-bold text-center mb-6">
            Password Manager
          </h3>
          {/* ---------------------------------------- */}
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Enter Old Password
          </label>

          <input
            type="password"
            name="old_password"
            // value={userProfile.old_password || ""}
            // value={user.username}
            onChange={handleChange}
            className="input-pill mb-5"
          />

          {/* <p className="input-pill mb-5"> {userProfile.old_password}</p> */}

          <br />
          {/* ---------------------------------------- */}
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Enter New Password
          </label>
          {/* <p className="input-pill mb-5"> {userProfile.id}</p> */}
          <input
            type="password"
            name="new_password"
            // value={userProfile.old_password || ""}
            // value={user.username}
            onChange={handleChange}
            className="input-pill mb-5"
          />
          <br />
          {/* <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            New Password
          </label>
          <p className="input-pill mb-10"> {userProfile.email}</p>
          <br />
          <br /> */}
          {/* <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Password:
          </label>
          <p className="input-pill"> {userProfile.password}</p> */}
          {/* <br /> */}
          {/* <Button fullWidth onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button> */}
          {/* <br />
          <br /> */}

          <Button fullWidth onClick={handleSave}>
            Save
          </Button>

          {/* <br />
          <br />
          <Button fullWidth onClick={handleDelete}>
            Delete Account
          </Button>{" "} */}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
