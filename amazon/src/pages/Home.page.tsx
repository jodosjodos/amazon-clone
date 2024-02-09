import React, { useEffect } from "react";
import { logout, selectedUser } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";

function HomePage() {
  const dispatch = useAppDispatch();
  // load user from local storage
  const { user, jwt } = useAppSelector(selectedUser);
  const logoutHandler = () => {
    dispatch(logout());
  };
  useEffect(() => {}, [user, jwt]);
  return (
    <div>
      <h1>Home Page</h1>
      <a
        onClick={logoutHandler}
        style={{
          backgroundColor: "yellow",
          cursor: "pointer",
          height: "40px",
          width: "60px",
          padding: "8px",
        }}
      >
        Logout
      </a>
      {user?.email}
    </div>
  );
}

export default HomePage;
