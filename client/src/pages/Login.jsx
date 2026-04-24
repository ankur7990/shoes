import { useState } from "react";
import Button from "../components/common/Button";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [errors, setErrors] = useState({});
  // const [showPassword, setShowPassword] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("login clicked.");
    console.log(formData.email, formData.password);
    let newError = {};

    if (!formData.email) {
      newError.email = "Email is required";
      return newError;
    }
  };
  // validation logic
  // const validate = () => {
  //   let newErrors = {};

  //   if (!formData.email) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Invalid email format";
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Password is required";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters";
  //   }

  //   return newErrors;
  // };
  return (
    <div>
      <div className="">{/* <Button /> */}</div>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
