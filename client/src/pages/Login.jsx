import Button from "../components/common/Button";
import AuthLayout from "../layouts/AuthLayout";
import PasswordInput from "../components/common/PasswordInput";
import Checkbox from "../components/common/Checkbox";
import Input from "../components/common/Input";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../api/authService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";

function Login() {
  // const [remember, setRemember] = useState(true);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  // const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Login button clicked.");
      console.log("Form Data:", data);

      const response = await loginUser({
        email: data.email,
        password: data.password,
      });
      console.log(response.data.tokens);
      console.log("Login Successfully.");

      login(response.data.tokens.access, response.data.tokens.refresh);
      toast.success("Login successful ✅");

      navigate("/home");
    } catch (error) {
      // console.log(error.response.data.message);
      console.log(error.response?.data);
      handleApiError(error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-center mb-6"></h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          placeholder="Enter your email"
          register={register}
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />
        <br />
        <PasswordInput
          // label="Password"
          // type="password"
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
        {/* <Checkbox
          label="Remember me"
          name="remember"
          // checked={remember}
          // onChange={(e) => setRemember(e.target.checked)}
        /> */}
        <ForgotPasswordLink
          label="Forgot Password"
          to="/otp-for-forgot-password"
        />

        <Button fullWidth disabled={isSubmitting} type="submit">
          {isSubmitting ? "Processing..." : "Login"}
          {/* Login */}
        </Button>

        <ForgotPasswordLink label="Signup" to="/signup" align="center" />
      </form>
    </AuthLayout>
  );
}

export default Login;
