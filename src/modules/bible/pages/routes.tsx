import BibleBookPage from "./book.page";
import BibleHomePage from "./home.page";
import { RouteObject } from "react-router-dom";

export const BIBLE_ROUTES: RouteObject[] = [
  { path: "", Component: BibleHomePage },
  { path: "/:book/:chapter", Component: BibleBookPage },
  //   {
  //     path: "",
  //     element: <AppBaseLayoutComponent />,
  //     children: [],
  //   },
];
