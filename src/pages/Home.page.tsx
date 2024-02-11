import { HeaderComponent } from "../features/products/components/Header.component";
import { useAppDispatch, useAppSelector } from "../hooks/redux/hooks";
import { ProductComponent } from "../features/products/components/Product.component";
import { useEffect } from "react";
import { getProducts } from "../features/products/productSlice";

function HomePage() {
  const {  products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <HeaderComponent />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "48px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "48px",
        }}
      >
        {products.length > 0 &&
          products.map((product) => (
            <ProductComponent key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}

export default HomePage;
