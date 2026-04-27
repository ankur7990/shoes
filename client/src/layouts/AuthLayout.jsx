// function AuthLayout() {
//   return (
//     <div>
//       <h3>Login form</h3>
//     </div>
//   );
// }

import Apicall from "../pages/Apicall";
import Login from "../pages/Login";
import Reusable from "../pages/Reusable";
import Signup from "../pages/Signup";

// export default AuthLayout;

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
