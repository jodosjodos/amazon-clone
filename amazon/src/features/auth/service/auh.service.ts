import axios from "axios";
import { DisplayUser } from "../components/model/DisplayUser.interface";
import { NewUser } from "../components/model/NewUse";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(
    `${import.meta.env.BASE_URL}/auth/register`,
    newUser
  );
  return response.data;
};

export const authService = {
  register,
  // login,
  // logout,
  // verifyJwt,
};
