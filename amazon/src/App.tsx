import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import SignInPage from "./pages/SignIn.page";
import { PrivateRoute } from "./features/auth/components/PrivateRoute";
import { CartPage } from "./pages/Cart.page";
import { Footer } from "./features/Footer";
function App() {
  const user = {
    username: "jodos",
    email: "jeandedieu2020@gmail.com",
    github: "jodosjodos",
    linkedIn: "Jean de Dieu NSHIMYUMUKIZA",
  };
  // main app
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/cart" element={<PrivateRoute page={<CartPage />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer user={user} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
