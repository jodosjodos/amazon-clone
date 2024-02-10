import axios from "axios";
import { ProductDocument } from "../models/Product";

const getProducts = async () => {
  const response = axios.get<ProductDocument[]>(
    `${import.meta.env.VITE_BASE_API}/product`
  );
  return response;
};

export const productService = {
  getProducts,
};
