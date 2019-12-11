import React, { useState, useEffect } from "react";
import firebase from "../config/firebase-config";
import axios from "axios";

import QRCode from "qrcode.react";

function Homepage(props) {
  const [user, setUser] = useState();
  const [mount, setMount] = useState(false);
  const [, forceUpdate] = React.useState(0);

  useEffect(() => {
    if (!mount) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          axios
            .post("/user", {
              uid: user.uid
            })
            .then(res => {
              if (res.data && res.data.uid) {
                setUser(res.data);
                return {
                  id: res.data.id,
                  checked: res.data.checked.checkedIn
                };
              }
            })
            .then(res => {
              if (!res.checked) {
                axios
                  .post("/status", {
                    id: res.id
                  })
                  .then(res => {
                    if (res.data && res.data.checked.checkedIn) {
                      setUser(res.data);
                      forceUpdate(up => !up);
                      axios
                        .post("/taken", {
                          id: res.data.id
                        })
                        .then(res => {
                          setUser(res.data);
                          forceUpdate(up => !up);
                        });
                    }
                  })
              } else {
                axios
                  .post("/taken", {
                    id: res.id
                  })
                  .then(res => {
                    setUser(res.data);
                    forceUpdate(up => !up);
                  });
              }
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
      {user && !user.checked.checkedIn && (
        <>
          <p>{user.email}</p>
          <p>{user.fullName}</p>
          <p>{user.checked.ticketCode}</p>
          <p>
            <QRCode value={user.checked.ticketCode} level="H" />
          </p>
          <button onClick={signOut}>sign out</button>
        </>
      )}
      {user && user.checked.checkedIn && (
        <>
          <p>{user.email}</p>
          <p>{user.fullName}</p>
          {!user.gifts.taken && (
            <>
            <p>{user.gifts.gift}</p>
            <p>{user.gifts.luckyMoney}</p>
            </>
          )}
          {user.gifts.taken && (
            <>
            <p>{user.gifts.gift} <em>(đã nhận)</em></p>
            <p>{user.gifts.luckyMoney} <em>(đã nhận)</em></p>
            </>
          )}
          <button onClick={signOut}>sign out</button>
        </>
      )}
      {!user && (
        <button onClick={() => props.history.push("/register")}>sign in</button>
      )}
    </div>
  );
}

export default Homepage;
