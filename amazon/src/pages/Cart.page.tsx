import { useState } from "react";
import { HeaderComponent } from "../features/products/components/Header.component";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { useNavigate } from "react-router-dom";

export const CartPage = () => {
  const dispatch = useAppDispatch();
  // load user from local storage
  const { cart ,products} = useAppSelector((state) => state.product);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <HeaderComponent />
      <div>mee it is cart</div>
    </div>
  );
};
