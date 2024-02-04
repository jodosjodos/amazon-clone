import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.page";
import RegisterPage from "./pages/Register.page";
import SignInPage from "./pages/SignIn.page";
function App() {
  // main app
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
