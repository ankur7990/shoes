import { useState } from "react";
import Input from "../components/common/Input";
import { Navigate, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [fpassword, setFPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    console.log("Verify EMail clicked.");
    navigate("/verify-email");
  }

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Forgot password</h2>

        <p>Enter your email address below to reset password.</p>
        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={fpassword}
          onChange={(e) => setFPassword(e.target.value)}
          required
        />

        <br />
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify email address
        </button>

        <p>{fpassword}</p>
      </form>
    </div>
  );
}

export default ForgotPassword;
