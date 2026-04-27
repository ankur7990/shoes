import { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/common/PasswordInput";

function VerifyPassword() {
  const [newPass, setNewpass] = useState("");
  const [confirmPass, setConfirmpass] = useState("");

  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("send to create password ");
    navigate("/");
  }

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Verify password</h2>

        <p>Enter yout new password below to goin access into your account.</p>
        {/* OTP */}
        <br />
        {/* <h2>OTP Enter</h2> */}
        <PasswordInput
          label="New Password"
          type="text"
          placeholder="Enter new password "
          value={newPass}
          onChange={(e) => setNewpass(e.target.value)}
          required
        />
        <PasswordInput
          label="Confirm Password"
          type="text"
          placeholder="Enter confirm password "
          value={confirmPass}
          onChange={(e) => setConfirmpass(e.target.value)}
          required
        />

        <br />
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify Password
        </button>

        <p>{newPass}</p>
        <p>{confirmPass}</p>
      </form>
    </div>
  );
}

export default VerifyPassword;
