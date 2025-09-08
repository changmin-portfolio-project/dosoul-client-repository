import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_PATH } from "./global/const/AppPathConst";
import { AdminDashboard } from "./pages/AdminDashboard";
import { ManageContactPage } from "./pages/ManageContact";
import { ManageMakeRoomPage } from "./pages/ManageMakeRoomPage";
import { ManageMoveInPage } from "./pages/ManageMoveIn";
import { ManageMoveinDetailPage } from "./pages/ManageMoveinDetailPage";
import { ManageMoveOutPage } from "./pages/ManageMoveOut";
import { ManageMoveoutDetailPage } from "./pages/ManageMoveoutDetailPage";
import { ManageRoomPage } from "./pages/ManageRoom";
import { ManageRoomDetailPage } from "./pages/ManageRoomDetailPage";
import { ManageSystemPage } from "./pages/ManageSystem";
import { ManageUserPage } from "./pages/ManageUser";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={APP_PATH.MANAGE.ROOM} element={<ManageRoomPage />} />
      <Route path={APP_PATH.MANAGE.MOVE_IN} element={<ManageMoveInPage />} />
      <Route path={APP_PATH.MANAGE.MOVE_OUT} element={<ManageMoveOutPage />} />
      <Route path={APP_PATH.MANAGE.MOVE_OUT} element={<ManageMoveOutPage />} />
      <Route path={APP_PATH.MANAGE.CONTACT} element={<ManageContactPage />} />
      <Route path={APP_PATH.MANAGE.USER} element={<ManageUserPage />} />
      <Route path={APP_PATH.HOME} element={<AdminDashboard />} />
      <Route
        path={APP_PATH.MANAGE.MOVE_IN_DETAIL}
        element={<ManageMoveinDetailPage />}
      />
      <Route
        path={APP_PATH.MANAGE.MOVE_OUT_DETAIL}
        element={<ManageMoveoutDetailPage />}
      />

      <Route
        path={APP_PATH.MANAGE.ROOM_DETAIL}
        element={<ManageRoomDetailPage />}
      />
      <Route
        path={APP_PATH.MANAGE.ROOM_MAKE}
        element={<ManageMakeRoomPage />}
      />
      <Route path={APP_PATH.MANAGE.SYSTEM} element={<ManageSystemPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
