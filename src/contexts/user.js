import React, { createContext, useState, useEffect } from "react";
import firebase from "../config/firebase-config";
import axios from "axios";

const UserContext = createContext({});

const UserProvider = props => {
  const [global, setGlobal] = useState({});
  const [mount, setMount] = useState();

  useEffect(() => {
    if (!mount) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setGlobal({ ...global, auth: user.toJSON() });
          axios
            .post("/user", {
              uid: user.toJSON().uid
            })
            .then(res => {
              if (res.data) setGlobal({ auth: user.toJSON(), user: res.data });
            });
        }
      });
    }
    setMount(true);
  }, [global, mount]);

  const updateUser = user => {
    setGlobal({ ...global, user: user });
  };

  return (
    <UserContext.Provider
      value={{ auth: global.auth, user: global.user, updateUser }}
      {...props}
    />
  );
};

export { UserContext, UserProvider };
