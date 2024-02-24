import { Navigate, Outlet } from "react-router-dom";
import { useTodoContext } from "../Store/Store";

export default function RedirectPage() {
  const { user } = useTodoContext();
  return <>{user ? <Outlet /> : <Navigate to="/login" />}</>;
}
