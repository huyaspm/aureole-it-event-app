import React, { useState, useEffect } from "react";
import firebase from "../config/firebase-config";
import axios from "axios";

import QRCode from "qrcode.react";

function Homepage(props) {
  const [user, setUser] = useState();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          axios
            .post("/user", {
              uid: user.uid
            })
            .then(res => {
              setUser(res.data);
            });
        } else setUser(null);
      });
      setMount(true);
    }
  }, [user, mount]);

  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      {user && (
        <>
          <p>{user.email}</p>
          <p>{user.fullName}</p>
          <p>{user.ticketCode}</p>
          <p>
            <QRCode value={user.ticketCode} level="H" renderAs="canvas" />
          </p>
          <button onClick={signOut}>sign out</button>
        </>
      )}
      {!user && (
        <button onClick={() => props.history.push("/register")}>
          register
        </button>
      )}
    </div>
  );
}

export default Homepage;
