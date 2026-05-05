import { useState, useEffect } from "react";
import { deleteUserAccount, getUserProfile } from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  //fetch profile
  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      console.log(res);

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

  if (!userProfile) return <p>Loading profile...</p>;

  return (
    //   <div>
    //     <div className="h-screen w-screen bg-amber-200 flex justify-center items-center">
    //       <div>
    //         <div>
    //           <div>
    //             <h2 className="text-xl font-bold">Profile</h2>

    //             <p>Id: {userProfile.id}</p>

    //             <p>Name: {userProfile.username}</p>
    //             <p>Email: {userProfile.email}</p>
    //             <p>DOB: {userProfile.date_of_birth}</p>
    //             <p>Gender: {userProfile.gender}</p>
    //             <p>Mobile: {userProfile.mobile_no}</p>
    //             {/* <p>Email: {userProfile.email}</p> */}

    //             <button
    //               onClick={handleDelete}
    //               className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
    //             >
    //               Delete Account
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // );

    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="p-20">
          <h3 className="text-2xl text-white font-bold text-center mb-6">
            Profile
          </h3>
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            ID:
          </label>
          <p className="input-pill mb-5"> {userProfile.id}</p>
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
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Name:
          </label>
          <p className="input-pill"> {userProfile.username}</p>
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Gender:
          </label>
          <p className="input-pill"> {userProfile.gender}</p>
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Mobile:
          </label>
          <p className="input-pill"> {userProfile.mobile_no}</p>

          <br />
          <Button fullWidth onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
