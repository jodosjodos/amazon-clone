import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "./models/Cart";
import { ProductDocument } from "./models/Product";
import { productService } from "./services/product.service";

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  products: ProductDocument[];
  //   selected product with quantity
  cart: Cart;
}
// initialInput State

const initialState: ProductState = {
  products: [],
  cart: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getProducts = createAsyncThunk("product", async () => {
  try {
    return await productService.getProducts();
  } catch (error) {
    console.log("error: ", error);
  }
});
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
  },
});
