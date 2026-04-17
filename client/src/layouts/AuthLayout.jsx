// function AuthLayout() {
//   return (
//     <div>
//       <h3>Login form</h3>
//     </div>
//   );
// }

import Login from "../pages/Login";

// export default AuthLayout;

const AuthLayout = () => {
  return (
    <div class="h-screen  flex items-center justify-center bg-brand-gradient">
      <Login />
    </div>
  );
};

export default AuthLayout;
