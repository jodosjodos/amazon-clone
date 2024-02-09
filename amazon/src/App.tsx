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
function App() {
  // main app
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
