import React, { useState } from "react";

import "./styles.css";
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
}));

export default function Topbar(props) {
  const classes = useStyles();
  const history = useHistory();

  const handleLogoutBtnOnClick = () => {
    localStorage.removeItem("user");
    history.push("/login");
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FunRetro Clone
          </Typography>
          {props.loggedIn ? (
            <div>
              <Button>
                <span className="loginBtn">{props.fullname}</span>
              </Button>
              <Button onClick={handleLogoutBtnOnClick}>
                <span className="loginBtn">Logout</span>
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button>
                  <span className="loginBtn">Login</span>
                </Button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button>
                  <span className="loginBtn">Register</span>
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
