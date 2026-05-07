import { useState, useEffect } from "react";
import {
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();
  //fetch profile
  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      console.log(res.data.data);

      setUserProfile(res.data.data);
    } catch (error) {
      handleApiError(error);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  //delete user

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    try {
      await deleteUserAccount();
      toast.success("Account deleted successfully ❌");
      logout(); // remove tokens
      navigate("/login");
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleSave = async () => {
    setIsEditing(false);
    console.log("Updated.");

    // call API here to save updated profile

    const res = await updateUserProfile(userProfile);
    console.log(res);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!userProfile) return <p>Loading profile...</p>;

  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="p-20">
          <h3 className="text-2xl text-white font-bold text-center mb-6">
            Profile
          </h3>
          {/* ---------------------------------------- */}
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={userProfile.username || ""}
              // value={user.username}
              onChange={handleChange}
              className="input-pill mb-5"
            />
          ) : (
            <p className="input-pill mb-5"> {userProfile.username}</p>
          )}
          {/* <br /> */}
          {/* ---------------------------------------- */}
          {/* <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            ID:
          </label>
          <p className="input-pill mb-5"> {userProfile.id}</p> */}
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Email:
          </label>
          <p className="input-pill mb-10"> {userProfile.email}</p>
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            DOB:
          </label>
          <p className="input-pill"> {userProfile.date_of_birth}</p>
          {/* <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Name:
          </label>
          <p className="input-pill"> {userProfile.username}</p> */}
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Gender:
          </label>
          <p className="input-pill"> {userProfile.gender}</p>
          <br />
          {/* ------------------Mobile Profile---------------------- */}
          {isEditing ? (
            <input
              type="text"
              name="mobile_no"
              value={userProfile.mobile_no || ""}
              onChange={handleChange}
              className="input-pill mb-5"
            />
          ) : (
            <p className="input-pill mb-5"> {userProfile.mobile_no}</p>
          )}
          {/* ---------------------------------------- */}
          {/* <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Mobile:
          </label>
          <p className="input-pill"> {userProfile.mobile_no}</p>
          <br /> */}
          {/* <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Password:
          </label>
          <p className="input-pill"> {userProfile.password}</p> */}
          <br />
          <Button fullWidth onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <br />
          <br />
          {isEditing && (
            <Button fullWidth onClick={handleSave}>
              Save
            </Button>
          )}
          <br />
          <br />
          <Button fullWidth onClick={handleDelete}>
            Delete Account
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Profile;
