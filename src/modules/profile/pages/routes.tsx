import ProfilePage from "./profile";
import { RouteObject } from "react-router-dom";
import AppBaseLayoutComponent from "@/modules/@shared/components/layout/app-base-layout.component";

export const PROFILE_ROUTES: RouteObject[] = [
  {
    path: "",
    element: <AppBaseLayoutComponent />,
    children: [{ path: "profile", Component: ProfilePage }],
  },
];
