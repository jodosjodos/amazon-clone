import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/input/use-input";
import {
  validateNameLength,
  validatePasswordLength,
} from "../../../shared/utils/validation/length";
import { validateEmail } from "../../../shared/utils/validation/email";
import { NewUser } from "./model/NewUse";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { register, reset } from "../authSlice";

export const RegistrationForm: FC = () => {
  // name
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

  // email
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  // password
  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  // confirm password

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  // clear form
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.auth
  );

  // navigation
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate("/signin");
    }
  }, [isSuccess, dispatch, clearForm,navigate]);

  // submit form

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    )
      return;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    const newUser: NewUser = {
      name,
      email,
      password,
    };
    console.log("new user submitted", newUser);
    dispatch(register(newUser));
  };
  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  if (isError) {
    return (
      <Typography variant="body1" color="error">
        The following error have occurred: , please try again
      </Typography>
    );
  }
  return (
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
            Create account
          </Typography>
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="name"
          >
            Your name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? "Enter your name" : ""}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

          {/* email */}
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="email"
          >
            Email
          </InputLabel>
          <TextField
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText={emailHasError ? " enter valid email " : ""}
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
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText={passwordHasError ? "Minium 6 characters required" : ""}
            type="password"
            name="password"
            id="password"
            variant="outlined"
            placeholder="Minium 6 characters  required"
            size="small"
          />
          {/* confirm password */}
          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="confirmPassword"
          >
            Re-enter password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && confirmPassword !== password}
            helperText={
              confirmPassword.length > 0 && confirmPassword !== password
                ? "passwords must match"
                : ""
            }
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            variant="outlined"
            size="small"
          />
          <Button
          id="register-link"
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
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: "30px" }}>
        <small>
          <span>By creating an account , you agree to Amazon's</span>
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
      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />
      <div>
        <small>
          Already have an account?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            {" "}
            sign In{" "}
          </Link>
        </small>
      </div>
      <div>
        <small>
          Buying for work?
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Create a free business account{" "}
          </a>
        </small>
      </div>
    </Box>
  );
};
