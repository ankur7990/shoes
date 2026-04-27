import { useState } from "react";
import Input from "../components/common/Input";
import Dropdown from "../components/common/Dropdown";
import PasswordInput from "../components/common/PasswordInput";
import DateInput from "../components/common/DateInput";
import ForgotPasswordLink from "../components/common/ForgotPasswordLink";
import Button from "../components/common/Button";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // const [list, setList] = useState("");
  const [dob, setDob] = useState("");
  const [mono, setMono] = useState("");

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
  return (
    <div className=" min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <form className=" p-8 w-full max-w-md space-y-5">
        <h3 className="text-2xl text-white font-bold text-center mb-6">
          Register now
        </h3>

        {/* Name */}
        <Input
          label="Username"
          type="username"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password */}
        <PasswordInput label="Create Password" name="password" />

        {/* Gender = list  */}

        <Dropdown
          label="Select Role"
          options={roleOptions}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        {/* DOB date  */}

        <DateInput
          label="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        {/* MOB number   */}
        <Input
          label="Mobile Number"
          type="text"
          placeholder="Enter your Mobile Number"
          value={mono}
          onChange={(e) => setMono(e.target.value)}
          required
        />
        <br />
        {/* Submit Button */}
        <Button type="submit" fullWidth>
          Signup
        </Button>

        <ForgotPasswordLink label="Login" to="login" align="middle" />

        <p>{username}</p>
        <p>{email}</p>
        <p>{role}</p>
        <p>{dob}</p>
        <p>{mono}</p>
      </form>
    </div>
  );
}

export default Signup;
