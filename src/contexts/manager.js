import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const initialState = {
  manager: null
};

if (localStorage.getItem("jwt-token")) {
  const decoded = jwtDecode(localStorage.getItem("jwt-token"));
  if (decoded.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwt-token");
  } else {
    initialState.manager = decoded;
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt-token")}`;
  }
}

const ManagerContext = createContext({
  manager: null,
  signIn: data => {},
  signOut: () => {}
});

const managerReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        manager: action.payload
      };
    case "SIGNOUT":
      return {
        ...state,
        manager: null
      };
    default:
      return state;
  }
};

const ManagerProvider = props => {
  const [state, dispatch] = useReducer(managerReducer, initialState);
  const signIn = data => {
    localStorage.setItem("jwt-token", data.token);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
    dispatch({
      type: "SIGNIN",
      payload: data
    });
  };
  const signOut = data => {
    localStorage.removeItem("jwt-token");
    dispatch({
      type: "SIGNOUT"
    });
  };
  return (
    <ManagerContext.Provider
      value={{ manager: state.manager, signIn, signOut }}
      {...props}
    />
  );
};

export { ManagerContext, ManagerProvider };
