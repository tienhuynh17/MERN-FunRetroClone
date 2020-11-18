import React, { useState } from "react";
import axios from "axios";
import { Draggable } from "react-beautiful-dnd";

import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import { BASE_API_URL } from "../../utils/constant";
import authHeader from "../../services/auth-header";

const useStyles = makeStyles((theme) => ({
  all: { width: "330px" }, // set ẩu
  root: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#009688",
    color: "white",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
  },
  updateRoot: {
    width: "100%",
    padding: "10px",
    backgroundColor: "white",
    color: "black",
    marginBottom: "10px",
    borderRadius: "5px",
    display: "flex",
    borderStyle: "solid",
    borderColor: "#009688",
  },
  name: {
    margin: "0px",
  },
  wrapIcon: {
    marginLeft: "auto",
  },
  icon: {
    width: "20px",
    height: "auto",
    cursor: "pointer",
  },
}));

const Card = (props) => {
  const classes = useStyles();

  const [reqUpdate, setReqUpdate] = useState(false);
  const [openedDeleteBoardDialog, setOpenedDeleteBoardDialog] = useState(false);
  const [cardName, setCardName] = useState(props.card.name);

  const handleDeleteBoardDialogClose = (e) => {
    setOpenedDeleteBoardDialog(false);
  };

  const handleEditBtnOnClick = () => {
    setReqUpdate(true);
  };

  const handleDoneBtnOnClick = () => {
    axios
      .post(
        `${BASE_API_URL}/api-cards/update-name/${props.card._id}`,
        { name: cardName },
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.status === 200) {
          setReqUpdate(false);
          props.handleCloseCardOnClick(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteBtnOnClick = () => {
    axios
      .post(
        `${BASE_API_URL}/api-cards/delete/${props.card._id}`,
        {},
        { headers: authHeader() }
      )
      .then((res) => {
        if (res.status === 200) {
          setOpenedDeleteBoardDialog(false);
          props.handleCloseCardOnClick(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCardNameOnChange = (e) => {
    setCardName(e.target.value);
  };

  console.log("card");
  return (
    <div>
      <Draggable draggableId={props.card._id} index={props.index}>
        {(provided) => (
          <div
            className={classes.all}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={reqUpdate ? classes.updateRoot : classes.root}>
              {reqUpdate ? (
                <div>
                  <TextField
                    value={cardName}
                    onChange={handleCardNameOnChange}
                  />
                  <IconButton
                    className={classes.wrapIcon}
                    onClick={handleDoneBtnOnClick}
                  >
                    <DoneIcon className={classes.icon} />
                  </IconButton>
                </div>
              ) : (
                <p className={classes.name}>{props.card.name}</p>
              )}
              {reqUpdate ? (
                <IconButton
                  className={classes.wrapIcon}
                  onClick={() => {
                    setOpenedDeleteBoardDialog(true);
                  }}
                >
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.wrapIcon}
                  onClick={handleEditBtnOnClick}
                >
                  <EditIcon className={classes.icon} />
                </IconButton>
              )}
            </div>
          </div>
        )}
      </Draggable>
      <Dialog
        open={openedDeleteBoardDialog}
        onClose={handleDeleteBoardDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this card?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleDeleteBoardDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              handleDeleteBtnOnClick(e);
              handleDeleteBoardDialogClose(e);
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Card;
