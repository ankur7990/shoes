import { useState } from "react";
import Input from "../components/common/Input";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Logo from "../components/common/Logo";
import logo from "../assets/logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Verify Email clicked.");
    navigate("/verify-email");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-layout-main ">
      <form className="  p-8 w-full max-w-md space-y-2" onSubmit={handleSubmit}>
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
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
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

        <p>{email}</p>
      </form>
    </div>
  );
}

export default ForgotPassword;
