import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";

import { BASE_API_URL } from "../../utils/constant";
import authHeader from "../../services/auth-header";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "10px",
    backgroundColor: "white",
    width: "95%",
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

const CardInput = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [cardName, setCardName] = useState("");

  const handleCardNameOnChange = (e) => {
    setCardName(e.target.value);
  };

  const handleDoneBtnOnClick = () => {
    if (cardName === "") {
      props.handleCancelBtnOnClick(false);
    } else {
      axios
        .post(
          `${BASE_API_URL}/api-cards/create`,
          {
            name: cardName,
            boardId: props.boardId,
            columnId: props.columnId,
          },
          { headers: authHeader() }
        )
        .then((res) => {
          props.handleCancelBtnOnClick(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={classes.root}>
      <div>
        <TextField value={cardName} onChange={handleCardNameOnChange} />
        <IconButton className={classes.wrapIcon} onClick={handleDoneBtnOnClick}>
          <DoneIcon className={classes.icon} />
        </IconButton>
      </div>
      <IconButton
        className={classes.wrapIcon}
        onClick={() => props.handleCancelBtnOnClick(false)}
      >
        <DeleteIcon className={classes.icon} />
      </IconButton>
    </div>
  );
};

export default CardInput;
