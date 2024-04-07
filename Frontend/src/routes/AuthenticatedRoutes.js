import Login from "../pages/Login";
import Signup from "../pages/Signup";

export const AuthenticatedRoutes = [
  { path: "/Login", element: <Login /> },
  { path: "/", element: <Signup /> },
];
