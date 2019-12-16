import React, { createContext, useState, useEffect } from "react";
import firebase from "../config/firebase-config";
import axios from "axios";

const UserContext = createContext({});

const UserProvider = props => {
  const [global, setGlobal] = useState({});
  const [mount, setMount] = useState();

  useEffect(() => {
    if (!mount) {
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          setGlobal({ ...global, auth: user.toJSON() });
          await axios
            .post("/user", {
              uid: user.toJSON().uid
            })
            .then(res => {
              if (res.data) setGlobal({ ...global, auth: user.toJSON(), user: res.data });
            })
            .catch(err => console.log(err));
          
        }
      });
    }
    setMount(true);
  }, [global, mount]);

  const updateUser = user => {
    setGlobal({ ...global, user: user });
  };

  const signOut = () => {
    firebase.auth().signOut();
    setGlobal({ ...global, auth: null });
  };

  return (
    <UserContext.Provider
      value={{ auth: global.auth, user: global.user, updateUser, signOut }}
      {...props}
    />
  );
};

export { UserContext, UserProvider };
