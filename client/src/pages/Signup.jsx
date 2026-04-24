import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const validateErrors = validate();

    if (Object.keys(validateErrors).length === 0) {
      console.log("signup sucess", formData);
      alert("signup successful.");
    } else {
      setErrors(validateErrors);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // Validation function
  const validate = () => {
    let newErrors = {};

    //NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    //email

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+. \S/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    //password
    if (!formData.password) {
      newErrors.password = "password is required";
    } else if (!formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    //confirmpassword
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "confirmpassword is required";
    } else if (formData.password !== formData.confirmpassword) {
      newErrors.confirmpassword = "Pass dont match";
    }
    return newErrors;
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-6 py-2 rounded-lg"
          />
          {errors.name && <p>{errors.name}</p>}
          {/* {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name}
            </p>
          )} */}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-6 py-2 rounded-lg"
          />
          {errors.email && <p>{errors.email}</p>}
          {/* {errors.email && (
            <p className="text-red-500 text-sm">
              {errors.email}
            </p>
          )} */}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-6 py-2 rounded-lg"
          />
          {errors.password && <p>{errors.password}</p>}
          {/* {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password}
            </p>
          )} */}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border px-6 py-2 rounded-lg"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

          {/* {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword}
            </p>
          )} */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
