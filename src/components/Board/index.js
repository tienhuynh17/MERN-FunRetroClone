import React, { useEffect, useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

import { BASE_API_URL } from "../../utils/constant";

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

  const [countCards, setCountCards] = useState(0);

  useEffect(() => {
    axios(`${BASE_API_URL}/api-cards/${props.board._id}`)
      .then(({ data }) => {
        if (data) setCountCards(data.count);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  return (
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
        <IconButton aria-label="add to favorites">
          <FileCopyOutlinedIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="show more">
          <MoreVertIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
