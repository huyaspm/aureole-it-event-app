import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { ManagerContext } from "../contexts/manager";

function ManagerRoute({ component: Component, ...rest }) {
  const { manager } = useContext(ManagerContext);

  return (
    <Route
      {...rest}
      render={props =>
        manager ? <Component {...props} /> : <Redirect to="/root" />
      }
    />
  );
}

export default ManagerRoute;
