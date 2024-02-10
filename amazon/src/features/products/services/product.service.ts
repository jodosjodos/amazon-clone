import axios from "axios";
import { ProductDocument } from "../models/Product";
import { Cart } from "../models/Cart";

const getProducts = async () => {
  const response = axios.get<ProductDocument[]>(
    `${import.meta.env.VITE_BASE_API}/product`
  );
  return response;
};

const modifyQtyByOne = (
  cart: Cart,
  selectedProduct: ProductDocument,
  modificationType: "INCREMENT" | "DECREMENT"
) => {
  const previousCart = [...cart];
  const productInCart = previousCart.find(
    (product) => product._id === selectedProduct._id
  );
  let newCart = [];
  if (!productInCart) {
    previousCart.push({ ...selectedProduct, quantity: 1 });
    newCart = previousCart;
  } else {
    const filteredProduct = previousCart.filter(
      (p) => p._id !== productInCart._id
    );
    const modification = modificationType == "INCREMENT" ? 1 : -1;
    productInCart.quantity = productInCart.quantity + modification;
    if (productInCart.quantity === 0) {
      newCart = [...filteredProduct];
    } else {
      newCart = [...filteredProduct, productInCart];
    }
  }
  localStorage.setItem("cart", JSON.stringify(newCart));
  return newCart;
};

export const productService = {
  getProducts,
  modifyQtyByOne,
};
