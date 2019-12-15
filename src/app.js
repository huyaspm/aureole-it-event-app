import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import { UserProvider } from "./contexts/user";
import { ManagerProvider } from "./contexts/manager";
import ManagerRoute from './route/manager'

import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Manager from "./pages/root/manager";
import Checker from "./pages/root/checker";
import Giver from "./pages/root/giver";
import Spinner from "./pages/root/spinner";
import Admin from "./pages/root/admin";

import Splash from "./components/splashscreen";
import Homepage from "./pages/homepage";
import Signin from "./pages/sign-in";
import Update from "./pages/update";

// axios.defaults.baseURL = "https://asia-east2-ait-app.cloudfunctions.net/api";
axios.defaults.baseURL = "http://localhost:5000/ait-app/asia-east2/api";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  });

  return ready ? (
    <UserProvider>
      <ManagerProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/sign-in" component={Signin} />
            <Route exact path="/update" component={Update} />
            <Route exact path="/root" component={Manager} />
            <ManagerRoute exact path="/root/scanner" component={Checker} />
            <ManagerRoute exact path="/root/giver" component={Giver} />
            <ManagerRoute exact path="/root/lucky-number" component={Spinner} />
            <ManagerRoute exact path="/root/admin" component={Admin} />
            <Route component={Homepage} />
          </Switch>
        </Router>
      </ManagerProvider>
    </UserProvider>
  ) : (
    <Splash />
  );
}

export default App;
