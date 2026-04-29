import Button from "../components/common/Button";
import AuthLayout from "../layouts/AuthLayout";
import PasswordInput from "../components/common/PasswordInput";
import { useState } from "react";
import Checkbox from "../components/common/Checkbox";
import Input from "../components/common/Input";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  // const [remember, setRemember] = useState(true);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  // const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("login requested.");
  // navigate("/home");

  // try {
  //   const res = await axios.post("http://192.168.0.178:8000/user-login/", {
  //     email,
  //     password,
  //   });

  // console.log(res.data.tokens.access);

  // store token
  //   localStorage.setItem("token", res.data.tokens.access);

  //   alert("Login success");
  // } catch (error) {
  //   console.log(error.response.data.message);
  // }

  // localStorage.setItem("savedToken", token);
  // }

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("savedToken");

  //   if (savedToken) {
  //     setToken(savedToken);
  //   }
  // }, []);
  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6"></h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          // type="email"
          placeholder="Enter your email"
          register={register}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+$\S/i,
              message: "Invalid email format",
            },
          }}
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <PasswordInput
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          register={register}
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters required",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
              message:
                "Must include 1 uppercase letter, 1 number, 1 special character",
            },
          }}
          error={errors.password}
          required
        />
        <Checkbox
          label="Remember me"
          name="remember"
          // checked={remember}
          // onChange={(e) => setRemember(e.target.checked)}
        />
        <ForgotPasswordLink to="forgot-password" />

        <Button fullWidth type="submit">
          Login
        </Button>

        {/* <ForgotPasswordLink label="Signup" to="forgot-password" align="middle" /> */}

        {/* <p>{email}</p>
        <p>{password}</p>
        <p>{remember ? "Checked" : "Unchecked"}</p> */}

        <ForgotPasswordLink to="signup" label="Signup" align="middle" />
      </form>
    </AuthLayout>
  );
}

export default Login;
