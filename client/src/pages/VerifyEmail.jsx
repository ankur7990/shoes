import { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("send to create password ");
    navigate("/verify-password");
  }

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-layout-main">
      <form className="p-8 w-full max-w-md" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold text-center mb-6 text-white">
          Verify email address
        </h3>

        <p className="text-white">
          Enter the four-digit OTP code sent to your address d*****@gmail.com
        </p>
        {/* OTP */}
        <br />
        {/* <h2>OTP Enter</h2> */}
        <Input
          label="OTP"
          type="text"
          placeholder="Enter your otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <br />
        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Verify OTP Code
        </Button>

        <p>{otp}</p>
      </form>
    </div>
  );
}

export default VerifyEmail;
