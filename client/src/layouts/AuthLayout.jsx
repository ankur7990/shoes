// function AuthLayout() {
//   return (
//     <div>
//       <h3>Login form</h3>
//     </div>
//   );
// }

import Logo from "../components/common/Logo";
import Apicall from "../pages/Apicall";
import Login from "../pages/Login";
import Reusable from "../pages/Reusable";
import Signup from "../pages/Signup";
import logo from "../assets/logo.png";

// export default AuthLayout;

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-layout-main flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl p-8 space-y-5">
        <Logo src={logo} />
        {children}
      </div>
    </div>
  );
};

// const AuthLayout = ({ children }) => {
//   return (
//     <div className="min-h-screen flex items-center justify-center ">
//       <div className="w-full max-w-md rounded-2xl p-8">{children}</div>
//     </div>
//   );
// };

export default AuthLayout;
