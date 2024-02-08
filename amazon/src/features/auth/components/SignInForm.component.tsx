import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";

export const SignInFormComponent: FC = () => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: "#ccc",
          width: "350px",
          marginTop: 2,
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography variant="h4" component="h1">
              Sign-In
            </Typography>

            {/* email */}
            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
              htmlFor="email"
            >
              Email
            </InputLabel>
            <TextField
              type="email"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />
            {/* password*/}
            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
              htmlFor="password"
            >
              Password
            </InputLabel>
            <TextField
              type="password"
              name="password"
              id="password"
              variant="outlined"
              placeholder="Minium 6 characters  required"
              size="small"
            />

            <Button
              variant="contained"
              style={{
                marginTop: "16px",
                height: "31px",
                backgroundColor: "#fc14b",
                color: "black",
                borderColor: "#a88734 #9c7e31 #846a29",
                textTransform: "none",
              }}
              type="submit"
            >
              Sign-In
            </Button>
          </Grid>
        </form>
        <div style={{ marginTop: "30px" }}>
          <small>
            <span>By continuing , you agree to Amazon's</span>
          </small>
        </div>
        <div>
          <small>
            <a href="#" style={{ textDecoration: "none" }}>
              {" "}
              Conditions of use{" "}
            </a>{" "}
            and{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              Privacy policy
            </a>
          </small>
        </div>
      </Box>
      <div style={{ marginTop: "16px" }}>
        <Divider>
          <small style={{ color: "#767676" }}>New to Amazon ?</small>
        </Divider>

        <div>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            <Button
              variant="contained"
              style={{
                width:"100%",
                marginTop: "12px",
                height: "31px",
                backgroundColor: "#f1f1f1",
                color: "black",
                textTransform: "none",
              }}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
