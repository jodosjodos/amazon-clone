import axios from "axios";
import { DisplayUser } from "../components/model/DisplayUser.interface";
import { NewUser } from "../components/model/NewUse";
import { LoginUser } from "../components/model/LoginUser.interface";
import { Jwt } from "../components/model/jwt";
import { DecodedJwt } from "../components/model/DecodedJwt.interface";
import { jwtDecode } from "jwt-decode";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_API}/auth/register`,
    newUser
  );
  return response.data;
};
const login = async (user: LoginUser): Promise<Jwt | null> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_API}/auth/login`,
    user
  );
  if (response.data) {
    localStorage.setItem("jwt", JSON.stringify(response.data));
    const decodedJwt: DecodedJwt = jwtDecode(response.data.token);
    localStorage.setItem("user", JSON.stringify(decodedJwt.user));
  }
  return response.data;
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_API}/auth/verify-jwt`,
    { jwt }
  );
  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }
  return false;
};

// logout
const logout = (): void => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
};

// TODO:login 1.26.0
export const authService = {
  register,
  login,
  logout,
  verifyJwt,
};
