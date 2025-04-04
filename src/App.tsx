import "../root.css";
import { RouterProvider } from "react-router-dom";
import { WrapperProvider } from "./contexts/wrapper.context";

import { createBrowserRouter } from "react-router-dom";
import AppToast from "./modules/@shared/components/toast";
import RouteGuardWrapper from "./modules/@shared/guards/route.guard";
import AppLoading from "./modules/@shared/components/loading/loading";

import { BIBLE_ROUTES } from "./modules/bible/pages/routes";
import { PROFILE_ROUTES } from "./modules/profile/pages/routes";
import { AUTHENTICATION_ROUTES } from "./modules/authentication/pages/routes";

export const AppRoutes = createBrowserRouter([
  { path: "*", element: <RouteGuardWrapper /> },
  {
    path: "/",
    element: <RouteGuardWrapper />,
    children: [...BIBLE_ROUTES, ...PROFILE_ROUTES, ...AUTHENTICATION_ROUTES],
  },
]);

function App() {
  return (
    <WrapperProvider>
      <AppToast />
      <AppLoading />
      <RouterProvider router={AppRoutes} />
    </WrapperProvider>
  );
}

export default App;
