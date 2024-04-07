import { useContext } from "react";
import Header from "../Components/Header";
import AccountSetting from "../pages/AccountSetting";
import Doctobo from "../pages/Doctobo";
import Home from "../pages/HomePage";
import Login from "../pages/Login";
import ResponsiveDrawer from "../pages/Sidebar/ResponsiveDrawer";
import Signup from "../pages/Signup";
import { AuthContext } from "../Context/AuthContext";
import AddDoctorAvailablity from "../pages/AddDoctorAvailablity";
import DoctorAppointments from "../pages/DoctorAppointments";
import PatientAppointments from "../pages/PatientAppointments";

export const MainRoutes = [
  {
    path: "/Dashboard",
    element: <ResponsiveDrawer />,
    children: [
      {
        path: "/Dashboard",
        element: <AccountSetting />,
      },
      {
        path: "/Dashboard/avaiablity",
        element: <AddDoctorAvailablity />,
      },
      {
        path: "/Dashboard/DoctorAppointment",
        element: <DoctorAppointments />,
      },
      {
        path: "/Dashboard/PatientAppointment",
        element: <PatientAppointments />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  { path: "/Login", element: <Login /> },
  { path: "/Signup", element: <Signup /> },
];
