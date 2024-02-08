import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "./components/model/DisplayUser.interface";
import { Jwt } from "./components/model/jwt";
import { NewUser } from "./components/model/NewUse";
import { authService } from "./service/auh.service";

//TODO:move higher
interface AsyncState {
  isLoading: boolean;
  isSucceeded: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}
// initialInput State

const initialState: AuthState = {
  user: null,
  jwt: null,
  isLoading: false,
  isSucceeded: false,
  isError: false,

  isAuthenticated: false,
};

// thunks
export const register = createAsyncThunk(
  "auth/register",
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue("unable to register user");
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = false;
      state.isSucceeded = false;
    },
  },
  extraReducers: (builder) => {
    // register actions
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucceeded = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});
