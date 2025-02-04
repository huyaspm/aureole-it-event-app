import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import "./app.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Splash from "./components/splashscreen";

import { UserProvider } from "./contexts/user";
import { ManagerProvider } from "./contexts/manager";

const Template = lazy(() => import("./pages/christmas/template"));

const ManagerRoute = lazy(() => import("./route/manager"));
const Manager = lazy(() => import("./pages/root/manager"));
const Checker = lazy(() => import("./pages/root/checker"));
const EmailChecker = lazy(() => import("./pages/root/email-checker"));
const Giver = lazy(() => import("./pages/root/giver"));
const Spinner = lazy(() => import("./pages/root/spinner"));
const Admin = lazy(() => import("./pages/root/admin"));

const Homepage = lazy(() => import("./pages/homepage"));
const Signin = lazy(() => import("./pages/sign-in"));
const Update = lazy(() => import("./pages/update"));

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
          <Suspense
            fallback={
              <div />
            }
          >
            <Switch>
              <Route exact path="/" component={Template} />
              <Route exact path="/yearend-party" component={Homepage} />
              <Route exact path="/sign-in" component={Signin} />
              <Route exact path="/update" component={Update} />
              <Route exact path="/root" component={Manager} />
     
              <ManagerRoute exact path="/root/scanner" component={Checker} />
              <ManagerRoute exact path="/root/scanner/email" component={EmailChecker} />
              <ManagerRoute exact path="/root/giver" component={Giver} />
              <ManagerRoute
                exact
                path="/root/lucky-number"
                component={Spinner}
              />
              <ManagerRoute exact path="/root/admin" component={Admin} />
              <Route component={Template} />
            </Switch>
          </Suspense>
        </Router>
      </ManagerProvider>
    </UserProvider>
  ) : (
    <Splash />
  );
}

export default App;
