import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";

import LoginTheme from "../../public/images/login-theme.jfif";

import Topbar from "../layouts/Topbar";

import { BASE_API_URL } from "../../utils/constant";
import authService from "../../services/auth.service";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Our website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: "100vh",
  },
  main: {
    margin: "20px 0",
    height: "85vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  socialBtn: {
    marginTop: "20px",
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMessages, setErrMessages] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_API_URL}/api-auth/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.errMessages) {
          setErrMessages(res.data.errMessages);
        } else if (res.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(res.data));
          history.push("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLoginBtnOnClick = () => {
    window.open(`${BASE_API_URL}/api-auth/google`, "_self");
  };

  const handleFacebookLoginBtnOnClick = () => {
    window.open(`${BASE_API_URL}/api-auth/facebook`, "_self");
  };

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  if (authService.getCurrentUser()) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Topbar loggedIn={false} />
      <Container fixed>
        <Grid container component="main" className={classes.main}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7}>
            <img src={LoginTheme} alt="logintheme" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={(e) => handleSubmit(e)}
              >
                {errMessages.errUsername ? (
                  <TextField
                    error
                    label="Username"
                    helperText={errMessages.errUsername}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    name="username"
                    value={username}
                    onChange={(e) => handleUsernameOnChange(e)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    autoFocus
                    value={username}
                    onChange={(e) => handleUsernameOnChange(e)}
                  />
                )}
                {errMessages.errPassword ? (
                  <TextField
                    error
                    label="Password"
                    name="password"
                    type="password"
                    helperText={errMessages.errPassword}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    onChange={(e) => handlePasswordOnChange(e)}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={(e) => handlePasswordOnChange(e)}
                  />
                )}
                {errMessages.errSignin ? (
                  <MuiAlert elevation={6} variant="filled" severity="error">
                    {errMessages.errSignin}
                  </MuiAlert>
                ) : (
                  ""
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <Button
                      className={classes.socialBtn}
                      onClick={handleGoogleLoginBtnOnClick}
                      variant="outlined"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      className={classes.socialBtn}
                      onClick={handleFacebookLoginBtnOnClick}
                      variant="outlined"
                      color="primary"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
