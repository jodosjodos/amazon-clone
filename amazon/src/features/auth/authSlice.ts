import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DisplayUser } from "./components/model/DisplayUser.interface";
import { Jwt } from "./components/model/jwt";
import { NewUser } from "./components/model/NewUse";
import { authService } from "./service/auh.service";
import { RootState } from "../../store";
import { LoginUser } from "./components/model/LoginUser.interface";

// get user from localStorage
const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser | null = storedUser ? JSON.parse(storedUser) : null;

// jwt

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt = storedJwt ? JSON.parse(storedJwt) : null;

//TODO:move higher
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt;
  isAuthenticated?: boolean;
}
// initialInput State

const initialState: AuthState = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// thunks
// register
export const register = createAsyncThunk(
  "auth/register",
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("unable to register user");
    }
  }
);

// login
export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("unable to login user");
    }
  }
);

// logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// verify jwt
export const verifyJwt = createAsyncThunk(
  "auth/verify-jwt",
  async (jwt: string, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("failed to verify JWT");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
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
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload.jwt;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // logout

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })

      // verify jwt

      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;
export const selectedUser = (state: RootState) => {
  return state.auth;
};
