import Button from "../components/common/Button";
import AuthLayout from "../layouts/AuthLayout";
import PasswordInput from "../components/common/PasswordInput";
import { useState } from "react";
import Checkbox from "../components/common/Checkbox";
import Input from "../components/common/Input";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";
import axios from "axios";

function Login() {
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [token, setToken] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("login requested.");

    try {
      const res = await axios.post("http://192.168.0.178:8000/user-login/", {
        email,
        password,
      });

      // console.log(res.data.tokens.access);

      // store token
      localStorage.setItem("token", res.data.tokens.access);

      alert("Login success");
    } catch (error) {
      console.log(error.response.data.message);
    }

    // localStorage.setItem("savedToken", token);
  }

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("savedToken");

  //   if (savedToken) {
  //     setToken(savedToken);
  //   }
  // }, []);
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6"></h2>
      <form onSubmit={handleSubmit}>
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

        <Button fullWidth type="submit">
          Login
        </Button>

        {/* <ForgotPasswordLink label="Signup" to="forgot-password" align="middle" /> */}

        <p>{email}</p>
        <p>{password}</p>
        <p>{remember ? "Checked" : "Unchecked"}</p>

        <ForgotPasswordLink to="signup" label="Signup" align="middle" />
      </form>
    </AuthLayout>
  );
}

export default Login;
