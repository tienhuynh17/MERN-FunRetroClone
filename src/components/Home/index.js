import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

import "./styles.css";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Board from "../Board";
import AddBoardButton from "../AddBoardButton";
import Topbar from "../layouts/Topbar";
import Nav from "../layouts/Nav";

import { BASE_API_URL } from "../../utils/constant";
import authHeader from "../../services/auth-header";
import authService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  myBoard: {
    color: "#47484c",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "20px 10px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  const [listBoard, setListBoard] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();

  // const currentUser = authService.getCurrentUser;
  // console.log(currentUser);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (authService.getCurrentUser()) {
      axios(`${BASE_API_URL}/api-boards/user/${currentUser.id}`, {
        headers: authHeader(),
      })
        .then(({ data }) => {
          if (data) setListBoard(data.boards);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  console.log(isLoggedIn);

  if (authService.getCurrentUser() === null) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="mainSpace">
      <Topbar loggedIn={true} fullname={currentUser.fullname} />
      <Nav />
      <Container fixed>
        <p className={classes.myBoard}>My Board</p>
        <AddBoardButton />
        <div className="boards">
          {listBoard.map((board) => (
            <Board key={board._id} className="card" board={board} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
