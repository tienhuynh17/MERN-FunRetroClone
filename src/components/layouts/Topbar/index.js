import React from "react";

import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import authService from "../../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  loginBtn: {
    color: "white",
  },
}));

export default function Topbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleLogoutBtnOnClick = () => {
    authService.logout();
    history.push("/login");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className={classes.title}
          >
            <Typography variant="h6" className={classes.loginBtn}>
              FunRetro Clone
            </Typography>
          </Link>
          {props.loggedIn ? (
            <div>
              <Link
                to={{ pathname: "/user-info" }}
                style={{ textDecoration: "none" }}
              >
                <Button>
                  <span className={classes.loginBtn}>
                    {props.user.fullname}
                  </span>
                </Button>
              </Link>
              <Button onClick={handleLogoutBtnOnClick}>
                <span className={classes.loginBtn}>Logout</span>
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>
                  <span className={classes.loginBtn}>Login</span>
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button>
                  <span className={classes.loginBtn}>Register</span>
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
