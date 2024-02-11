import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { logout, selectedUser } from "../../auth/authSlice";
import { useNavigate } from "react-router-dom";
import { AppBar, Badge, Box, Button, Toolbar } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";

export const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  // load user from local storage
  const { user } = useAppSelector(selectedUser);
  const { cart } = useAppSelector((state) => state.product);
  const [cartCount, setCartCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalQty);
    localStorage.setItem("count", totalQty.toString());
  }, [cart]);
  //   logout
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Box>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#131921", color: "white", padding: "4px" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            onClick={() => navigate("/")}
            style={{
              width: "113px",
              height: "50px",
              paddingTop: "10px",
              cursor: "pointer",
            }}
            src="/amazon-logo2.png"
            alt="amazon logo"
          />
          <div style={{ display: "flex" }}>
            <div>
              <div className="hover:text-white hover:cursor-pointer text-[#FF9900]">Hello , {user?.name}</div>
              <Button
                onClick={logoutHandler}
                sx={{ padding: 0, marginRight: "16px", color: "inherit" }}
                className="hover:text-[#FF9900]"
              >
                Sign out
              </Button>
            </div>
            <Button onClick={() => navigate("/cart")}>
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartOutlined fontSize="large" />
              </Badge>
              <span>Cart</span>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
