import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiAlert from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";

import Topbar from "../layouts/Topbar";

import { BASE_API_URL } from "../../utils/constant";
import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";

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

export default function UserInfo(props) {
  const currentUserId = authService.getCurrentUser();

  const classes = useStyles();

  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [errMessages, setErrMessages] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [isChangedPassword, setIsChangedPassword] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (currentUserId) {
      axios(`${BASE_API_URL}/api-users/me`, { headers: authHeader() })
        .then((res) => {
          const data = res.data;
          setUser(data);
          setUsername(data.username);
          setPassword(data.password);
          setConfirmedPassword(data.password);
          setFullname(data.fullname);
          setEmail(data.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleUsernameOnChange = (e) => {
    setUsername(e.target.value);
    setIsChanged(true);
  };

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
    setIsChanged(true);
    setIsChangedPassword(true);
  };

  const handleConfirmedPasswordOnChange = (e) => {
    setConfirmedPassword(e.target.value);
    setIsChanged(true);
    setIsChangedPassword(true);
  };

  const handleFullnameOnChange = (e) => {
    setFullname(e.target.value);
    setIsChanged(true);
  };

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
    setIsChanged(true);
  };

  const handleUpdateBtnOnClick = (e) => {
    e.preventDefault();

    axios
      .post(
        `${BASE_API_URL}/api-users/me/update`,
        {
          username,
          password,
          confirmedPassword,
          fullname,
          email,
          isChangedPassword,
        },
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.errMessages) {
          setErrMessages(res.data.errMessages);
        } else if (res.status === 200) {
          setIsSuccessful(true);
          setIsChanged(false);
          setErrMessages({});
        }
      })
      .catch((err) => console.log(err));
  };

  if (!currentUserId) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Topbar loggedIn={true} user={user} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Infomation
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => handleUpdateBtnOnClick(e)}
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
                  value={password}
                  onChange={(e) => handlePasswordOnChange(e)}
                />
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="password"
                    name="password"
                    value={password}
                    label="Password"
                    autoComplete="current-password"
                    onChange={(e) => handlePasswordOnChange(e)}
                  />
                </Grid>
              )}
              {errMessages.errConfirmedPassword ? (
                <TextField
                  error
                  label=" Confirmed Password"
                  type="password"
                  helperText={errMessages.errConfirmedPassword}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  autoFocus
                  name="confirmedPassword"
                  value={confirmedPassword}
                  onChange={(e) => handleConfirmedPasswordOnChange(e)}
                />
              ) : (
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    type="password"
                    required
                    fullWidth
                    name="confirmedPassword"
                    label="Confirmed Password"
                    value={confirmedPassword}
                    onChange={(e) => handleConfirmedPasswordOnChange(e)}
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

              {errMessages.errUpdate ? (
                <Grid item xs={12}>
                  <MuiAlert elevation={6} variant="filled" severity="error">
                    {errMessages.errUpdate}
                  </MuiAlert>
                </Grid>
              ) : (
                ""
              )}
              {isSuccessful ? (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Update successfully — check it out!
                  </Alert>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {isChanged ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                className={classes.submit}
                disabled
              >
                Update
              </Button>
            )}
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
