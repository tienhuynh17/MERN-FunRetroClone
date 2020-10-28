import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 100,
    maxWidth: 100,
    margin: "5px 10px",
    backgroundColor: "transparent",
    "&:hover": {
      boxShadow: "0 0 11px rgba(33,33,33,.2)",
      cursor: "pointer",
    },
  },
  center: {
    textAlign: "center",
  },
  addIcon: {
    width: "40px",
    height: "40px",
    color: "#3F51B5",
  },
  text: {
    color: "#3F51B5",
    fontSize: "12px",
    fontWeight: "bold",
  },
}));

export default function AddBoardButton() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.center}>
          <AddCircleIcon className={classes.addIcon} />
          <p className={classes.text}>Add Board</p>
        </div>
      </CardContent>
    </Card>
  );
}
