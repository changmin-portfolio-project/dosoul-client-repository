import { TRUE_PARAM } from "@root/packages/consts/src";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { APP_PATH } from "./global/const/AppPathConst";
import HomePage from "./pages/Home";
import { HouseDetailPage } from "./pages/HouseDetailPage";
import { HouseMoveinPage } from "./pages/HouseMoveinlPage";
import { MyMoveinDetailPage } from "./pages/MyMoveinDetailPage";
import { MyMoveinPage } from "./pages/MyMoveinPage";
import { MyMoveoutDetailPage } from "./pages/MyMoveoutDetailPage";
import { MyMoveoutPage } from "./pages/MyMoveoutPage";
import { MyProfilePage } from "./pages/MyProfilePage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import WishlistPage from "./pages/WishlistPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={APP_PATH.HOME} element={<HomePage />} />
      <Route path={APP_PATH.HOUSE_DETAIL} element={<HouseDetailPage />} />
      <Route path={APP_PATH.MOVE_IN} element={<HouseMoveinPage />} />
      <Route path={APP_PATH.WISHLIST} element={<WishlistPage />} />
      <Route path={APP_PATH.MY.MOVE_IN} element={<MyMoveinPage />} />
      <Route path={APP_PATH.MY.MOVE_OUT} element={<MyMoveoutPage />} />
      <Route path={APP_PATH.MY.PROFILE} element={<MyProfilePage />} />
      <Route
        path={APP_PATH.MY.MOVE_IN_DETAIL}
        element={<MyMoveinDetailPage />}
      />
      <Route
        path={APP_PATH.MY.MOVE_OUT_DETAIL}
        element={<MyMoveoutDetailPage />}
      />

      <Route path={APP_PATH.PASSWORD.RESET} element={<PasswordResetPage />} />
      <Route
        path="*"
        element={<Navigate to={`/?show_error=${TRUE_PARAM}`} replace />}
      />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
