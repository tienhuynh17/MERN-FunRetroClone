import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  navBar: {
    padding: "15px 0",
    backgroundColor: "#ffffff",
  },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <div className={classes.navBar}>
      <Container fixed>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="textPrimary" href="/" aria-current="page">
            DASHBOARD
          </Link>
          <Link color="inherit" href="#">
            TEAM
          </Link>
          <Link color="inherit" href="#">
            ANALYTICS
          </Link>
          <Link color="inherit" href="#">
            BILLING
          </Link>
        </Breadcrumbs>
      </Container>
    </div>
  );
}
