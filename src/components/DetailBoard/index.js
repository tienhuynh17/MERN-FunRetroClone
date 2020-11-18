import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect, useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Topbar from "../layouts/Topbar";
import Column from "../Column";

import authService from "../../services/auth.service";
import authHeader from "../../services/auth-header";
import { BASE_API_URL } from "../../utils/constant";

const useStyles = makeStyles((theme) => ({
  mainSpace: {
    backgroundColor: "#f3f3f3",
    minHeight: "100vh",
  },
  toolbar: {
    backgroundColor: "white",
    minHeight: "40px",
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    padding: "10px 0",
  },
  columns: {
    paddingTop: "30px",
  },
}));

const DetailBoard = (props) => {
  const classes = useStyles();
  const currentUserId = authService.getCurrentUser();
  const boardId = useParams().id;

  const [user, setUser] = useState({});
  let [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    console.log(dataChanged);
    if (currentUserId) {
      axios(`${BASE_API_URL}/api-users/me`, { headers: authHeader() })
        .then((res) => {
          const data = res.data;
          setUser(data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${BASE_API_URL}/api-boards/detail-board/${boardId}`, {
          headers: authHeader(),
        })
        .then((res) => {
          if (res.data) {
            setBoard(res.data.board);
          }
        })
        .catch((err) => console.log(err));

      axios(`${BASE_API_URL}/api-columns`)
        .then((res) => {
          if (res.data) {
            setColumns(res.data.columns);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [dataChanged]);

  const onDragEnd = (result) => {
    const { source, destination, reason } = result;
    if (reason === "DROP" && destination && source) {
      const preColumnId = source.droppableId;
      const dropedColumnId = destination.droppableId;
      const draggableCardId = result.draggableId;
      if (preColumnId !== dropedColumnId) {
        axios
          .post(
            `${BASE_API_URL}/api-cards/update-column/${draggableCardId}`,
            { columnId: dropedColumnId },
            { headers: authHeader() }
          )
          .then((res) => {
            setDataChanged(!dataChanged);
            console.log(dataChanged);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  if (!currentUserId) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={classes.mainSpace}>
      <Topbar loggedIn={true} user={user} />
      <Toolbar className={classes.toolbar}>
        <Container fixed>
          <Typography className={classes.title} variant="h5" noWrap>
            Board - {board.name}
          </Typography>
        </Container>
      </Toolbar>
      <Container className={classes.columns} fixed>
        <Grid container spacing={5}>
          <DragDropContext onDragEnd={onDragEnd}>
            {columns.map((column) => {
              return (
                <Grid key={column._id} item xs={12} sm={6} md={4}>
                  <Column
                    column={column}
                    boardId={boardId}
                    dataChange={dataChanged}
                  />
                </Grid>
              );
            })}
          </DragDropContext>
        </Grid>
      </Container>
    </div>
  );
};

export default DetailBoard;
