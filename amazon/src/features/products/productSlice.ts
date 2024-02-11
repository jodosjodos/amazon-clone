import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
const storedCart = localStorage.getItem("cart");

const initialState: ProductState = {
  products: [],
  cart: storedCart ? JSON.parse(storedCart) : [],
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
  reducers: {
    incrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = productService.modifyQtyByOne(
        state.cart,
        action.payload,
        "INCREMENT"
      );
      state.cart = modifiedCart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    decrementProduct: (state, action: PayloadAction<ProductDocument>) => {
      const modifiedCart = productService.modifyQtyByOne(
        state.cart,
        action.payload,
        "DECREMENT"
      );
      state.cart = modifiedCart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    resetCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          state.cart = JSON.parse(storedCart);
        }
      })
      .addCase(getProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = [];
      });
  },
});

export const { incrementProduct, decrementProduct, resetCart } =
  productSlice.actions;
