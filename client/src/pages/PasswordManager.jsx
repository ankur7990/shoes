import { updateUserPassword } from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import PasswordInput from "../components/common/PasswordInput";
import { useForm } from "react-hook-form";

const PasswordManager = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Save button clicked.");
      console.log("Form Data:", data);
      await updateUserPassword(data);
      toast.success("Password updated ✅");
      navigate("/home");
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  // return (
  //   <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
  //     <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
  //       <h3 className="text-2xl text-white font-bold text-center mb-6">
  //         Password Manager
  //       </h3>
  //       <PasswordInput
  //         // label="Password"
  //         // type="password"
  //         name="old_password"
  //         placeholder="Enter old password"
  //         register={register}
  //         // value={password}
  //         // onChange={(e) => setPassword(e.target.value)}
  //         rules={{
  //           required: "Password is required",
  //           minLength: {
  //             value: 6,
  //             message: "Minimum 6 characters required",
  //           },
  //           pattern: {
  //             value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  //             message:
  //               "Must include 1 uppercase letter, 1 number, 1 special character",
  //           },
  //         }}
  //         error={errors.old_password}
  //         required
  //       />
  //       <br />
  //       <PasswordInput
  //         // label="Password"
  //         // type="password"
  //         name="new_password"
  //         placeholder="Enter New password"
  //         register={register}
  //         // value={password}
  //         // onChange={(e) => setPassword(e.target.value)}
  //         rules={{
  //           required: "Password is required",
  //           minLength: {
  //             value: 6,
  //             message: "Minimum 6 characters required",
  //           },
  //           pattern: {
  //             value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  //             message:
  //               "Must include 1 uppercase letter, 1 number, 1 special character",
  //           },
  //         }}
  //         error={errors.new_password}
  //         required
  //       />
  //       <br />

  //       <Button fullWidth disabled={isSubmitting} type="submit">
  //         {isSubmitting ? "Processing..." : "Save"}
  //         {/* Login */}
  //       </Button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="bg-gradient-layout-main flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <form
          className="w-full rounded-3xl border border-[#43e77f] bg-black/20 p-5 backdrop-blur-sm sm:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Avatar */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#43e77f] bg-black/20 text-3xl">
              🔐
            </div>
          </div>

          {/* Heading */}
          <h3 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
            Password Manager
          </h3>

          {/* Old Password */}
          <label className="mb-2 block text-sm font-medium text-white sm:text-base">
            Current Password
          </label>

          <PasswordInput
            name="old_password"
            placeholder="Enter current password"
            register={register}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  "Must include 1 uppercase letter, 1 number, 1 special character",
              },
            }}
            error={errors.old_password}
            required
          />

          <div className="h-6" />

          {/* New Password */}
          <label className="mb-2 block text-sm font-medium text-white sm:text-base">
            New Password
          </label>

          <PasswordInput
            name="new_password"
            placeholder="Enter new password"
            register={register}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message:
                  "Must include 1 uppercase letter, 1 number, 1 special character",
              },
            }}
            error={errors.new_password}
            required
          />

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4">
            <Button fullWidth disabled={isSubmitting} type="submit">
              {isSubmitting ? "Processing..." : "Save Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordManager;
