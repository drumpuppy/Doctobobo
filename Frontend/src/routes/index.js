import { useRoutes } from "react-router-dom";
import { AuthenticatedRoutes } from "./AuthenticatedRoutes.js";
import { MainRoutes } from "./MainRoutes.js";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.js";

export const ThemeRoutes = () => {
  // const { user } = useContext(AuthContext);

  // const routes = user ? MainRoutes : AuthenticatedRoutes;
  // return useRoutes(routes);

  return useRoutes(MainRoutes);
};
