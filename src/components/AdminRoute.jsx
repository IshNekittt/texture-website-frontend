import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAdminLoggedIn } from "../redux/admin/selectors";

export default function AdminRoute() {
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
