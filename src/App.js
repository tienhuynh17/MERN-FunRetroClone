import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserInfo from "./components/UserInfo";
import DetailBoard from "./components/DetailBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/user-info">
          <UserInfo />
        </Route>
        <Route exact path="/detail-board/:id">
          <DetailBoard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
