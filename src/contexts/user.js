import React, { createContext, useState, useEffect } from "react";
import firebase from "../config/firebase-config";
import axios from "axios";

const UserContext = createContext({});

const UserProvider = props => {
  const [global, setGlobal] = useState({});

  const fetch = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setGlobal({ ...global, auth: user.toJSON() });
        // axios
        //   .post("/user", {
        //     uid: user.toJSON().uid
        //   })
        //   .then(res => {
        //     if (res.data)
        //       setGlobal({ ...global, auth: user.toJSON(), user: res.data });
        //   })
        //   .catch(err => console.log(err));

        axios
          .post("/gift", {
            uid: user.toJSON().uid
          })
          .then(res => {
            if (res.data)
              setGlobal({ ...global, auth: user.toJSON(), user: res.data });
          })
          .catch(err => console.log(err));
      }
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const updateUser = user => {
    setGlobal({ ...global, user: user });
  };

  const signOut = () => {
    firebase.auth().signOut();
    setGlobal({ ...global, auth: null });
  };

  return (
    <UserContext.Provider
      value={{
        auth: global.auth,
        user: global.user,
        updateUser,
        signOut
      }}
      {...props}
    />
  );
};

export { UserContext, UserProvider };
