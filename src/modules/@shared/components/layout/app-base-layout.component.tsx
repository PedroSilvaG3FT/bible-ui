import { Outlet } from "react-router-dom";
import AppFooter from "@/modules/@shared/components/layout/app-footer.component";
import AppHeader from "@/modules/@shared/components/layout/app-header.component";

export default function AppBaseLayoutComponent() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
}
