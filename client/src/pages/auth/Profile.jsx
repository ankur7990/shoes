import { useState, useEffect } from "react";
import {
  deleteUserAccount,
  getUserProfile,
  updateUserProfile,
} from "../../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../../api/errorHandler";
import { useAuth } from "../../context/AuthContext";
import { data, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import DateInput from "../../components/common/DateInput";
import { useForm } from "react-hook-form";
import Dropdown from "../../components/common/Dropdown";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  //fetch profile
  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      console.log(res.data.data);

      setUserProfile(res.data.data);
      reset(res.data.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    register("gender", {
      required: "Please select a gender",
    });
  }, [register]);

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

  // Update user
  const onSubmit = async (data) => {
    console.log("Updated.");

    // call API here to save updated profile

    const res = await updateUserProfile(data);
    console.log(res);

    // refresh latest profile
    await fetchProfile();

    // close edit mode
    setIsEditing(false);
  };

  //Handle inputes
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
      <div className="flex items-center justify-center  ">
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl text-white font-bold text-center mb-6">
            Profile
          </h3>
          {/* ---------------------------------------- */}
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Username:
          </label>
          {isEditing ? (
            <Input
              // label="Username"
              name="username"
              // type="username"
              placeholder="Enter your Username"
              // value={userProfile.username || ""}
              // onChange={handleChange}
              register={register}
              rules={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters allowed",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Only letters, numbers, and underscore allowed",
                },
              }}
              error={errors.username}
              required
            />
          ) : (
            <p className="input-pill mb-5"> {userProfile?.username}</p>
          )}
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
          {/* --------------------DOB-------------------- */}
          {isEditing ? (
            <DateInput
              name="date_of_birth"
              register={register}
              rules={{
                required: "Date of birth is required",
              }}
              error={errors.date_of_birth}
              required
            />
          ) : (
            <p className="input-pill"> {userProfile.date_of_birth}</p>
          )}
          {/* ----------------------gender list ------------------ */}
          <br />
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Gender:
          </label>
          {isEditing ? (
            <Dropdown
              name="gender"
              value={watch("gender")}
              onChange={(val) =>
                setValue("gender", val, { shouldValidate: true })
              }
              register={register}
              rules={{
                required: "Please select a gender",
              }}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
              ]}
              error={errors.gender}
            />
          ) : (
            <p className="input-pill"> {userProfile.gender}</p>
          )}
          <br />
          {/* ------------------Mobile Profile---------------------- */}
          <label
            className="text-white block text-left w-full mb-1"
            htmlFor="Id"
          >
            Mobile:
          </label>
          {isEditing ? (
            <Input
              name="mobile_no"
              placeholder="Enter your Mobile Number"
              register={register}
              rules={{
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid Indian mobile number",
                },
              }}
              error={errors.mobile_no}
              required
            />
          ) : (
            <p className="input-pill mb-5"> {userProfile.mobile_no}</p>
          )}
          <br />
          <Button
            fullWidth
            type="button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          <br />
          <br />
          {isEditing && (
            <Button type="submit" fullWidth>
              Save
            </Button>
          )}
          <br />
          <br />
          <Button fullWidth type="button" onClick={handleDelete}>
            Delete Account
          </Button>{" "}
        </form>
      </div>
    </div>
  );
};

export default Profile;
