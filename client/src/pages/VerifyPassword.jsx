import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/common/PasswordInput";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";

function VerifyPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("verify password button clicked.", data);
    console.log("send to create password ");
    navigate("/");
  };
  const navigate = useNavigate();

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
        <Button type="submit" fullWidth>
          Verify Password
        </Button>
      </form>
    </div>
  );
}

export default VerifyPassword;
