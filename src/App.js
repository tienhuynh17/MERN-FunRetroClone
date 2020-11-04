import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

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
      </Switch>
    </BrowserRouter>
  );
}
