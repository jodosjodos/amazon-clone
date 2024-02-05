import { Grid } from "@mui/material";
import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Grid>
      {/* grid */}
      <img src="amazon-logo.png" alt="amazon logo"  />
      <main>{children}</main>
    </Grid>
  );
}

export default AuthLayout;
