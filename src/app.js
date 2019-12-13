import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./app.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Splash from './components/splashscreen'

import Homepage from "./pages/homepage";
import Register from "./pages/register";
import Template from "./pages/template";
import Notfound from "./pages/notfound";

import { ManagerProvider } from "./utils/manager";
import ManagerRoute from "./route/manager";
import Scanner from "./pages/root/scanner";
import Manager from "./pages/root/manager";

axios.defaults.baseURL = "https://asia-east2-ait-app.cloudfunctions.net/api";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  });

  return ready ? (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/template" component={Template} />
        <ManagerProvider>
          <Route exact path="/root" component={Manager} />
          <ManagerRoute exact path="/root/scanner" component={Scanner} />
        </ManagerProvider>
        <Route exact component={Notfound} />
      </Switch>
    </Router>
  ) : (
    <Splash />
  );
}

export default App;
