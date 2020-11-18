import React, { useEffect, useState } from "react";
import axios from "axios";
import { Droppable } from "react-beautiful-dnd";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import CardComponent from "../Card";
import CardInput from "../CardInput";

import { BASE_API_URL } from "../../utils/constant";

const useStyles = makeStyles((theme) => ({
  columnHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  column: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    float: "left",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  card: {
    marginBottom: "10px",
    width: "90%",
  },
}));

const Column = (props) => {
  const classes = useStyles();

  const [cards, setCards] = useState([]);
  const [showAddTextField, setShowAddTextField] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const emptyCard = {
    _id: "123456",
    name: "",
    boardId: props.boardId,
    columnId: props.column._id,
  };

  useEffect(() => {
    console.log("cards axios");
    axios(`${BASE_API_URL}/api-cards/${props.boardId}/${props.column._id}`)
      .then((res) => {
        if (res.data) {
          setCards(res.data.cards);
          setIsModified(false);
        }
      })
      .catch((err) => console.log(err));
  }, [props.dataChange, showAddTextField, isModified]);

  const handleAddCardBtnOnClick = () => {
    setShowAddTextField(!showAddTextField);
  };

  const handleCancelAddCardOnClick = (value) => {
    setShowAddTextField(value);
  };

  const handleModifyBtnOnClick = (value) => {
    setIsModified(value);
  };

  console.log("column");
  return (
    <Card>
      <CardHeader
        title={props.column.name}
        titleTypographyProps={{ align: "center" }}
        subheaderTypographyProps={{ align: "center" }}
        className={classes.columnHeader}
      />
      <CardActions>
        <Button
          onClick={handleAddCardBtnOnClick}
          fullWidth
          variant="outlined"
          color="primary"
        >
          Add
        </Button>
      </CardActions>
      <CardContent>
        {showAddTextField && (
          <CardInput
            card={emptyCard}
            handleCancelBtnOnClick={handleCancelAddCardOnClick}
            boardId={props.boardId}
            columnId={props.column._id}
          />
        )}
        <div>
          <Droppable droppableId={props.column._id}>
            {(provided) => (
              <div
                className={classes.column}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card, pos) => {
                  return (
                    <CardComponent
                      key={card._id}
                      card={card}
                      index={pos}
                      handleCloseCardOnClick={handleModifyBtnOnClick}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </CardContent>
    </Card>
  );
};

export default Column;
