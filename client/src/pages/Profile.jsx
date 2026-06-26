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
import DateInput from "../components/common/DateInput";
import { useForm } from "react-hook-form";
import Dropdown from "../components/common/Dropdown";
import Button from "../components/common/Button";

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
    <div className="bg-gradient-layout-main flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <form
          className="w-full rounded-3xl border border-[#43e77f] bg-black/20 p-5 backdrop-blur-sm sm:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#43e77f] bg-black/20 text-3xl text-white">
              👤
            </div>
          </div>
          <h3 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Profile
          </h3>
          {/* ---------------------------------------- */}
          <label
            className="mb-2 block w-full text-left text-sm font-medium text-white sm:text-base"
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
            <p className="input-pill flex min-h-[44px] items-center text-sm sm:text-base">
              {" "}
              {userProfile?.username}
            </p>
          )}
          <br />
          <label
            className="mb-2 block w-full text-left text-sm font-medium text-white sm:text-base"
            htmlFor="Id"
          >
            Email:
          </label>
          <p className="input-pill flex min-h-[44px] items-center text-sm sm:text-base">
            {" "}
            {userProfile.email}
          </p>
          <br />
          <label
            className="mb-2 block w-full text-left text-sm font-medium text-white sm:text-base"
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
            <p className="input-pill flex min-h-[44px] items-center text-sm sm:text-base">
              {" "}
              {userProfile.date_of_birth}
            </p>
          )}
          {/* ----------------------gender list ------------------ */}
          <br />
          <label
            className="mb-2 block w-full text-left text-sm font-medium text-white sm:text-base"
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
            <p className="input-pill flex min-h-[44px] items-center text-sm sm:text-base">
              {" "}
              {userProfile.gender}
            </p>
          )}
          <br />
          {/* ------------------Mobile Profile---------------------- */}
          <label
            className="mb-2 block w-full text-left text-sm font-medium text-white sm:text-base"
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
            <p className="input-pill flex min-h-[44px] items-center text-sm sm:text-base">
              {" "}
              {userProfile.mobile_no}
            </p>
          )}
          <br />
          <div className="mt-8 flex flex-col gap-4">
            <Button
              fullWidth
              type="button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>

            {isEditing && (
              <Button type="submit" fullWidth>
                Save
              </Button>
            )}

            <Button fullWidth type="button" onClick={handleDelete}>
              Delete Account
            </Button>
          </div>
          {/* <Button
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
          </Button>{" "} */}
        </form>
      </div>
    </div>
  );
};

export default Profile;
