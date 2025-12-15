import { createBrowserRouter } from "react-router";
import Landing from "./components/Landing";
import Onboarding from "./components/Onboarding";
import ExploreRoles from "./components/ExploreRoles";
import RoleDetail from "./components/RoleDetail";
import CompareRoles from "./components/CompareRoles";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/onboarding",
    Component: Onboarding,
  },
  {
    path: "/explore",
    Component: ExploreRoles,
  },
  {
    path: "/role/:id",
    Component: RoleDetail,
  },
  {
    path: "/compare",
    Component: CompareRoles,
  },
]);
