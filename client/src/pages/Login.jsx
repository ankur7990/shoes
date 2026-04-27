import Button from "../components/common/Button";
import AuthLayout from "../layouts/AuthLayout";
import PasswordInput from "../components/common/PasswordInput";
import { useState } from "react";
import Checkbox from "../components/common/Checkbox";
import Input from "../components/common/Input";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";

function Login() {
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick() {
    console.log("Button clicked");
  }
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6"></h2>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <PasswordInput
        label="Password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Checkbox
        label="Remember me"
        name="remember"
        checked={remember}
        onChange={(e) => setRemember(e.target.checked)}
      />
      <ForgotPasswordLink to="forgot-password" />

      <Button fullWidth onClick={handleClick}>
        Login
      </Button>

      {/* <ForgotPasswordLink label="Signup" to="forgot-password" align="middle" /> */}

      <p>{email}</p>
      <p>{password}</p>
      <p>{remember ? "Checked" : "Unchecked"}</p>

      <ForgotPasswordLink to="signup" label="Signup" align="middle" />
    </AuthLayout>
  );
}

export default Login;
