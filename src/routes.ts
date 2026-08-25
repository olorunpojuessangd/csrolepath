import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { ExplorePage } from "./pages/ExplorePage";
import { RoleDetailPage } from "./pages/RoleDetailPage";
import { ComparePage } from "./pages/ComparePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/explore",
    Component: ExplorePage,
  },
  {
    path: "/role/:id",
    Component: RoleDetailPage,
  },
  {
    path: "/compare",
    Component: ComparePage,
  },
]);
