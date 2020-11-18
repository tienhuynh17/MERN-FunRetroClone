import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import { BASE_API_URL } from "../../utils/constant";
import authHeader from "../../services/auth-header";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "10px",
    "&:hover": {
      boxShadow: "0 0 11px rgba(33,33,33,.2)",
      cursor: "pointer",
    },
  },
}));

export default function Board(props) {
  const classes = useStyles();
  const history = useHistory();

  const [countCards, setCountCards] = useState(0);
  const [openedDeleteBoardDialog, setOpenedDeleteBoardDialog] = useState(false);
  const [openedEditBoardDialog, setOpenedEditBoardDialog] = useState(false);
  const [newBoardName, setNewBoardName] = useState(props.board.name);
  const [errMessages, setErrMessages] = useState(null);
  const [copiedBoardAlertOpen, setCopiedBoardAlertOpen] = useState(false);

  useEffect(() => {
    axios(`${BASE_API_URL}/api-cards/${props.board._id}`)
      .then(({ data }) => {
        if (data) setCountCards(data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const handleDeleteBoardDialogClose = (e) => {
    e.preventDefault();
    setOpenedDeleteBoardDialog(false);
  };

  const handleDeleteIconOnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenedDeleteBoardDialog(true);
  };

  const handleDeleteBoardDialogSubmit = (e) => {
    axios
      .post(
        `${BASE_API_URL}/api-boards/delete/${props.board._id}`,
        {},
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        handleDeleteBoardDialogClose(e);
        props.handleDataChanged();
      })
      .catch((err) => console.log(err));
  };

  const handleEditIconOnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpenedEditBoardDialog(true);
  };

  const handleEditBoardDialogClose = (e) => {
    e.preventDefault();
    setOpenedEditBoardDialog(false);
  };

  const handleNewBoardNameOnChange = (e) => {
    setNewBoardName(e.target.value);
  };

  const handleEditBoardSubmit = (e) => {
    axios
      .post(
        `${BASE_API_URL}/api-boards/update-name/${props.board._id}`,
        { name: newBoardName },
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.data.errMessages) {
          setErrMessages(res.data.errMessages);
        } else {
          props.handleDataChanged();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCopiedBoardAlertClose = (e) => {
    setCopiedBoardAlertOpen(false);
  };

  const handleShareIconOnClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(
      process.env.PORT
        ? process.env.PORT + "/detail-board/" + props.board._id
        : "http://localhost:3000/detail-board/" + props.board._id
    );
    setCopiedBoardAlertOpen(true);
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title={props.board.name}
          subheader={new Date(props.board.createdAt).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {countCards} cards
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={(e) => handleEditIconOnClick(e)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={(e) => handleShareIconOnClick(e)}>
            <ShareIcon />
          </IconButton>
          <IconButton onClick={(e) => handleDeleteIconOnClick(e)}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={openedDeleteBoardDialog}
        onClose={handleDeleteBoardDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this board?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleDeleteBoardDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleDeleteBoardDialogSubmit(e);
              handleDeleteBoardDialogClose(e);
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openedEditBoardDialog}
        onClose={(e) => handleEditBoardDialogClose(e)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit board name</DialogTitle>
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
              value={newBoardName}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => handleEditBoardDialogClose(e)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleEditBoardSubmit(e);
              handleEditBoardDialogClose(e);
            }}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={copiedBoardAlertOpen}
        autoHideDuration={3000}
        onClose={(e) => handleCopiedBoardAlertClose(e)}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Copied link to clipboard
        </Alert>
      </Snackbar>
    </div>
  );
}
