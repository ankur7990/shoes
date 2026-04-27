import { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("send to create password ");
    navigate("/verify-password");
  }

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Verify email address
        </h2>

        <p>
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
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify OTP Code
        </button>

        <p>{otp}</p>
      </form>
    </div>
  );
}

export default VerifyEmail;
