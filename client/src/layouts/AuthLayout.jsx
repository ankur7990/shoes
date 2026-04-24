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

const AuthLayout = () => {
  return (
    <div class="h-screen text-white  flex items-center justify-center bg-brand-gradient">
      {/* <Login /> */}

      {/* <Signup /> */}
      {/* <Apicall /> */}
      <Reusable />
    </div>
  );
};

export default AuthLayout;
