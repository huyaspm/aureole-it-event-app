import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.scss";

import Homepage from "./pages/homepage";
import Register from "./pages/register";
import Scanner from "./pages/scanner";
import Template from "./pages/template";
import Notfound from "./pages/notfound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/scanner" component={Scanner} />
        <Route exact path="/template" component={Template} />
        <Route exact component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
