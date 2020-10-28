import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import "./App.css";

import Topbar from "./components/layouts/Topbar";
import Nav from "./components/layouts/Nav";
import Board from "./components/Board";
import AddBoardButton from "./components/AddBoardButton";

import { BASE_API_URL } from "./utils/constant";

const useStyles = makeStyles((theme) => ({
  myBoard: {
    color: "#47484c",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "20px 10px",
  },
}));

export default function App() {
  const classes = useStyles();

  const [listBoard, setListBoard] = useState([]);

  useEffect(() => {
    axios(`${BASE_API_URL}/api-boards`)
      .then(({ data }) => {
        if (data) setListBoard(data.boards);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="mainSpace">
      <Topbar />
      <Nav />
      <Container fixed>
        <p className={classes.myBoard}>My Boards</p>
        <AddBoardButton />
        <div className="boards">
          {listBoard.map((board) => (
            <Board key={board._id} className="card" board={board} />
          ))}
        </div>
      </Container>
    </div>
  );
}
