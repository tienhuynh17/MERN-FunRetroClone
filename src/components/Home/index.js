import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useHistory, Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import Board from "../Board";
import Topbar from "../layouts/Topbar";
import Nav from "../layouts/Nav";

import { BASE_API_URL } from "../../utils/constant";
import authHeader from "../../services/auth-header";
import authService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
    backgroundColor: "#f3f3f3",
    minHeight: "100vh",
  },
  boards: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  dialogFont: {
    fontWeight: "bold",
  },
  myBoard: {
    color: "#47484c",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "20px 10px",
  },
  addBtn: {
    margin: "5px 10px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [listBoard, setListBoard] = useState([]);
  const [user, setUser] = useState({});
  const [openedAddBoardDialog, setOpenedAddBoardDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [errMessages, setErrMessages] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);

  if (
    location.search.includes("?successByGoogle") ||
    location.search.includes("?successByFacebook")
  ) {
    axios
      .get(`${BASE_API_URL}/api-auth/auth-token`, authService.config)
      .then((res) => {
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          setIsDataChanged(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      axios(`${BASE_API_URL}/api-users/me`, { headers: authHeader() })
        .then((res) => {
          const data = res.data;
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios(`${BASE_API_URL}/api-boards/me`, {
        headers: authHeader(),
      })
        .then(({ data }) => {
          if (data) {
            setListBoard(data.boards);
            setIsDataChanged(false);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isDataChanged]);

  useEffect(() => {});

  const handleAddBoardButtonOnClick = () => {
    setOpenedAddBoardDialog(true);
  };

  const handleAddBoardDialogClose = () => {
    setOpenedAddBoardDialog(false);
  };

  const handleNewBoardNameOnChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleAddBoardSubmit = (e) => {
    axios
      .post(
        `${BASE_API_URL}/api-boards/create`,
        { name: newBoardName },
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.errMessages) {
          setErrMessages(res.data.errMessages);
        } else {
          setOpenedAddBoardDialog(false);
          history.push("/detail-board/" + res.data.board._id);
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  if (authService.getCurrentUser() === null && location.search === "") {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.mainSpace}>
      <Topbar loggedIn={true} user={user} />
      <Nav />
      <Container fixed>
        <p className={classes.myBoard}>My Boards</p>
        <Button
          className={classes.addBtn}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddCircleIcon />}
          onClick={handleAddBoardButtonOnClick}
        >
          Add Board
        </Button>
        <div className={classes.boards}>
          {listBoard.map((board) => (
            <Link
              key={board._id}
              to={"/detail-board/" + board._id}
              style={{ textDecoration: "none" }}
            >
              <Board
                className={classes.card}
                board={board}
                handleDataChanged={() => setIsDataChanged(true)}
              />
            </Link>
          ))}
        </div>
      </Container>
      <Dialog
        open={openedAddBoardDialog}
        onClose={handleAddBoardDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new board</DialogTitle>
        <DialogContent>
          {errMessages ? (
            <TextField
              error
              onChange={handleNewBoardNameOnChange}
              autoFocus
              margin="dense"
              label="Board Name"
              fullWidth
              helperText={errMessages.errName}
            />
          ) : (
            <TextField
              onChange={handleNewBoardNameOnChange}
              autoFocus
              margin="dense"
              label="Board Name"
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddBoardDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddBoardSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
