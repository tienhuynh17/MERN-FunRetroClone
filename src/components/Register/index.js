import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";

import Topbar from "../layouts/Topbar";

import { BASE_API_URL } from "../../utils/constant";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [errMessages, setErrMessages] = useState({});

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFullnameOnChange = (e) => {
    setFullname(e.target.value);
  };

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSignupBtnOnClick = (e) => {
    e.preventDefault();
    console.log(username, password, fullname, email);

    axios
      .post(`${BASE_API_URL}/api-auth/register`, {
        username: username,
        password: password,
        fullname: fullname,
        email: email,
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
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Topbar loggedIn={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleSignupBtnOnClick(e)}
          >
            <Grid container spacing={2}>
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
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => handleUsernameOnChange(e)}
                  />
                </Grid>
              )}
              {errMessages.errPassword ? (
                <TextField
                  error
                  label="Password"
                  helperText={errMessages.errPassword}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                  name="password"
                  onChange={(e) => handlePasswordOnChange(e)}
                />
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    autoComplete="current-password"
                    onChange={(e) => handlePasswordOnChange(e)}
                  />
                </Grid>
              )}
              {errMessages.errFullname ? (
                <TextField
                  error
                  label="Fullname"
                  helperText={errMessages.errFullname}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                  name="fullname"
                  value={fullname}
                  onChange={(e) => handleFullnameOnChange(e)}
                />
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Full name"
                    name="fullname"
                    value={fullname}
                    onChange={(e) => handleFullnameOnChange(e)}
                  />
                </Grid>
              )}
              {errMessages.errEmail ? (
                <TextField
                  error
                  label="Email Address"
                  helperText={errMessages.errEmail}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => handleEmailOnChange(e)}
                />
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => handleEmailOnChange(e)}
                  />
                </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
