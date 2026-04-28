import { useState } from "react";
import Input from "../components/common/Input";
import Dropdown from "../components/common/Dropdown";
import PasswordInput from "../components/common/PasswordInput";
import DateInput from "../components/common/DateInput";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";
import Button from "../components/common/Button";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState([
    {
      username: "",
      email: "",
      role: "",
      dob: "",
      mono: "",
    },
  ]);

  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const [list, setList] = useState("");
  // const [dob, setDob] = useState("");
  // const [mono, setMono] = useState("");

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

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    //post data will cme here
    console.log("formdata submitted.", formData);

    try {
      const response = await axios.post(
        "http://192.168.0.178:8000/user-register",
        formData,
      );
      // const response = await axios.post(
      //   "http://192.168.0.149:8080/registerUser",
      //   formData,
      // );

      // http://192.168.0.149:8000/user-register

      console.log(response.data);
      alert("Signup successful");
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  }
  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <form className=" p-8 w-full max-w-md space-y-5" onSubmit={handleSubmit}>
        <h3 className="text-2xl text-white font-bold text-center mb-6">
          Register now
        </h3>

        {/* Name */}
        <Input
          label="Username"
          type="username"
          placeholder="Enter your Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {/* Password */}
        <PasswordInput label="Create Password" name="password" />

        {/* Gender = list  */}

        <Dropdown
          label="Select Role"
          options={roleOptions}
          value={formData.role}
          onChange={handleChange}
        />
        {/* DOB date  */}

        <DateInput
          label="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        {/* MOB number   */}
        <Input
          label="Mobile Number"
          type="text"
          placeholder="Enter your Mobile Number"
          value={formData.mono}
          onChange={handleChange}
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
