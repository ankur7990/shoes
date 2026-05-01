import Input from "../components/common/Input";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../api/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      console.log("forgot password button clicked.");
      console.log("forgot password data email is ", data);

      // const mainEmail = await forgotPassword({ email: data.email });
      // console.log(mainEmail);

      navigate("/verify-otp");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-layout-main ">
      <form
        className="  p-8 w-full max-w-md space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Logo src={logo} />
        <h3 className="text-2xl text-white font-bold text-center mb-6">
          Forgot password
        </h3>

        <div>
          <p className="text-white ">
            Enter your email address below to reset password.
          </p>
        </div>
        {/* Email */}
        {/* Email */}
        <Input
          name="email"
          placeholder="Enter your email"
          register={register}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />

        <br />
        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify email address
        </button> */}
        <Button type="submit" fullWidth>
          Verify email address
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
