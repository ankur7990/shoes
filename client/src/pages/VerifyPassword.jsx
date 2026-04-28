import { useState } from "react";
import Input from "../components/common/Input";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/common/PasswordInput";
import Button from "../components/common/Button";

import Logo from "../components/common/Logo";
import logo from "../assets/logo.png";

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
    <div className=" min-h-screen flex items-center justify-center bg-gradient-layout-main">
      <form className=" p-8 w-full max-w-md space-y-5" onSubmit={handleSubmit}>
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
        <Button type="submit" fullWidth>
          Verify Password
        </Button>

        <p>{newPass}</p>
        <p>{confirmPass}</p>
      </form>
    </div>
  );
}

export default VerifyPassword;
