import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { verifyOtp } from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";

function VerifyOTP() {
  console.log("verify otp excuted.");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("verif OTP button clicked", data);
      console.log("send to create password ");

      const email = localStorage.getItem("resetEmail");

      await verifyOtp({ email: email, otp: data.otp });

      toast.success("OTP verified ✅");

      navigate("/verify-password");
    } catch (error) {
      // console.log(error.response?.data);
      handleApiError(error);
    }
  };
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-layout-main">
      <form className="p-8 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <Logo src={logo} />
        <h3 className="text-2xl font-bold text-center mb-6 text-white">
          Verify OTP
        </h3>

        <p className="text-white">
          Enter the four-digit OTP code sent to your address d*****@gmail.com
        </p>
        {/* OTP */}
        <br />
        {/* <h2>OTP Enter</h2> */}
        <Input
          name="otp"
          register={register}
          placeholder="Enter your otp"
          rules={{
            required: "OTP is required",
            pattern: {
              value: /^\d{4}$/,
              message: "OTP must be 4 digits",
            },
          }}
          error={errors.otp}
          required
        />

        <br />
        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Verify OTP Code
        </Button>
      </form>
    </div>
  );
}

export default VerifyOTP;
