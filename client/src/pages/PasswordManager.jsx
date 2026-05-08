import { updateUserPassword } from "../api/authService";
import toast from "react-hot-toast";
import { handleApiError } from "../api/errorHandler";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import PasswordInput from "../components/common/PasswordInput";
import { useForm } from "react-hook-form";

const PasswordManager = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    try {
      console.log("Save button clicked.");
      console.log("Form Data:", data);
      await updateUserPassword(data);
      toast.success("Password updated ✅");
      navigate("/home");
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-2xl text-white font-bold text-center mb-6">
          Password Manager
        </h3>
        <PasswordInput
          // label="Password"
          // type="password"
          name="old_password"
          placeholder="Enter old password"
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
          error={errors.old_password}
          required
        />
        <br />
        <PasswordInput
          // label="Password"
          // type="password"
          name="new_password"
          placeholder="Enter New password"
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
          error={errors.new_password}
          required
        />
        <br />

        <Button fullWidth disabled={isSubmitting} type="submit">
          {isSubmitting ? "Processing..." : "Save"}
          {/* Login */}
        </Button>
      </form>
    </div>
  );
};

export default PasswordManager;
