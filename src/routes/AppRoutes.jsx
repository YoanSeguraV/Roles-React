import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import PageAdmin from "../pages/PageAdmin";
import PageModerator from "../pages/PageModerator";
import { ProtectedRoutesAdmin, ProctRoutes } from "./ProctRoutes";
import User from "../pages/User";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProctRoutes />}>
        <Route path="/moderador" element={<PageAdmin />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Route>

      <Route path="/" element={<Login />} />

      <Route element={<ProtectedRoutesAdmin />}>
        <Route path="/admin" element={<PageModerator />} />
      </Route>
      <Route path="*" element={<h1>404 found</h1>}></Route>
    </Routes>
  );
}

export default AppRoutes;
