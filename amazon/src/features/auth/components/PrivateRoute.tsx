import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { verifyJwt } from "../authSlice";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ page }: { page: JSX.Element }) => {
  const dispatch = useAppDispatch();
  const { isSuccess, isAuthenticated, jwt } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!jwt || !jwt.token) return;
    dispatch(verifyJwt(jwt.token));
  }, [jwt, isSuccess ,dispatch]);
  return isAuthenticated ? page : <Navigate replace to="/signin" />;
};
