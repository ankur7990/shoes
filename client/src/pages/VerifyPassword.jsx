import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/common/PasswordInput";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { resetPassword } from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";

function VerifyPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});

  const onSubmit = async (data) => {
    console.log("verify password button clicked.", data);
    console.log("send to create password ");
    try {
      const email = localStorage.getItem("resetEmail");
      await resetPassword({
        email,
        new_password: data.newpassword,
        confirm_password: data.confirmpassword,
      });

      localStorage.removeItem("resetEmail");

      toast.success("Password reset successful 🔐");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-layout-main">
      <form
        className=" p-8 w-full max-w-md space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo src={logo} />
        <h3 className="text-2xl text-white font-bold text-center mb-6">
          Verify password
        </h3>

        <p className=" text-white ">
          Enter yout new password below to goin access into your account.
        </p>
        {/* OTP */}
        <br />
        {/* <h2>OTP Enter</h2> */}
        <PasswordInput
          name="newpassword"
          register={register}
          label="New Password"
          type="text"
          placeholder="Enter new password "
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
          error={errors.newpassword}
          required
        />
        <PasswordInput
          name="confirmpassword"
          register={register}
          label="Confirm Password"
          type="text"
          placeholder="Enter confirm password "
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
          error={errors.confirmpassword}
          required
        />

        <br />
        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} fullWidth>
          {/* Verify Password */}
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}

export default VerifyPassword;
