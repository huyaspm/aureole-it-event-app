import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Homepage from "./pages/homepage";
import Register from "./pages/register";
import Scanner from "./pages/scanner";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/scanner" component={Scanner} />
      </Switch>
    </Router>
  );
}

export default App;
