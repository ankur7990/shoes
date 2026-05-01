import Input from "../components/common/Input";
import Dropdown from "../components/common/Dropdown";
import PasswordInput from "../components/common/PasswordInput";
import DateInput from "../components/common/DateInput";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";
import Button from "../components/common/Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/authService";

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    console.log("Sending signup payload:", data);

    try {
      const res = await signupUser({
        username: data.username,
        email: data.email,
        password: data.password,
        gender: data.gender,
        date_of_birth: data.date_of_birth,
        mobile_no: data.mobile_no,
      });

      console.log("Signup success:", res);

      navigate("/login");
    } catch (error) {
      console.log("Signup error:", error.response?.data);
    }
  };

  const genderArr = [
    {
      name: "male",
    },
    {
      name: "female",
    },
    {
      name: "other",
    },
  ];

  const roleOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  // function handleChange(e) {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   //post data will cme here
  //   console.log("formdata submitted.", formData);

  //   try {
  //     const response = await axios.post(
  //       "http://192.168.0.178:8000/user-register",
  //       formData,
  //     );
  //     // const response = await axios.post(
  //     //   "http://192.168.0.149:8080/registerUser",
  //     //   formData,
  //     // );

  //     // http://192.168.0.149:8000/user-register

  //     console.log(response.data);
  //     alert("Signup successful");
  //   } catch (error) {
  //     console.error(error);
  //     alert("Signup failed");
  //   }
  // }
  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <form
        className=" p-8 w-full max-w-md space-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl text-white font-bold text-center mb-6">
          Register now
        </h3>

        {/* Name */}
        <Input
          // label="Username"
          name="username"
          // type="username"
          placeholder="Enter your Username"
          // value={formData.username}
          // onChange={handleChange}
          register={register}
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters required",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20 characters allowed",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Only letters, numbers, and underscore allowed",
            },
          }}
          error={errors.username}
          required
        />
        {/* Email */}
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
        {/* Password */}
        <PasswordInput
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

        {/* Gender = list  */}

        <Dropdown
          name="gender"
          label="Select Gender"
          register={register}
          rules={{
            required: "Please select a gender",
          }}
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
          error={errors.gender}
        />
        {/* DOB date  */}

        <DateInput
          name="date_of_birth"
          register={register}
          rules={{
            required: "Date of birth is required",
          }}
          error={errors.date_of_birth}
          required
        />
        {/* MOB number   */}
        <Input
          name="mobile_no"
          placeholder="Enter your Mobile Number"
          register={register}
          rules={{
            required: "Mobile number is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid Indian mobile number",
            },
          }}
          error={errors.mobile_no}
          required
        />
        <br />
        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Signup
        </Button>

        <ForgotPasswordLink label="Login" to="login" align="middle" />

        {/* <p>{username}</p>
        <p>{email}</p>
        <p>{role}</p>
        <p>{dob}</p>
        <p>{mono}</p> */}
      </form>
    </div>
  );
}

export default Signup;
