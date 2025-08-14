import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthInit } from "../hooks/useAuth";
import { setUser, clearUser } from "../store/authSlice";
import FullPageSpinner from "../ui/FullPageSpinner";

export default function ProtectedRoute() {
  const dispatch = useDispatch();
  const { data, isPending, isFetched, isError, err } = useAuthInit();

  const user = data?.data?.user;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isFetched) {
      if (user) dispatch(setUser(user));
      else if (isError) {
        dispatch(clearUser());

        console.log(err);
      }
    }
  }, [isFetched, user, dispatch, isError]);

  if (isPending || !isFetched) return <FullPageSpinner />;

  if (!user && !isAuthenticated) return <Navigate to={"/auth/login"} replace />;

  return <Outlet />;
}
