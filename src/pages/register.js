import React, { useState, useEffect } from "react";
import firebase from "../config/firebase-config";
import axios from "axios";

const initialState = {
  user: null,
  message: "",
  codeInput: "",
  phoneNumber: "+84",
  confirmResult: null,
  email: "",
  fullName: ""
};

function Register(props) {
  const [auth, setAuth] = useState(initialState);
  const [user, setUser] = useState();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          setAuth({ ...auth, user: user.toJSON() });
          axios
            .post("/user", {
              uid: user.uid
            })
            .then(res => {
              if (res.data && res.data.uid) setUser(res.data);
            });
        } else {
          setUser(null);
          setAuth(initialState);
        }
      });
      setMount(true);
    }
  }, [auth, user, mount]);

  const signIn = () => {
    firebase.auth().settings.appVerificationDisabledForTesting = true;
    setAuth({ ...auth, message: "sending code.." });
    const appVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(auth.phoneNumber, appVerifier)
      .then(confirmResult =>
        setAuth({ ...auth, confirmResult, message: "code has been sent" })
      )
      .catch(() => setAuth({ ...auth, message: "invalid phone number" }));
  };

  const confirmCode = () => {
    if (auth.codeInput.length && auth.confirmResult) {
      auth.confirmResult
        .confirm(auth.codeInput)
        .then(() => setAuth({ ...auth, message: "code confirmed" }))
        .catch(() => setAuth({ ...auth, message: "invalid code" }));
    }
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  const updateDetail = () => {
    const email = auth.email + "@ait.com";
    axios
      .post("/register", {
        uid: auth.user.uid,
        email: email,
        fullName: auth.fullName,
        phoneNumber: auth.user.phoneNumber
      })
      .then(() => props.history.push("/"))
      .catch(() => setAuth({ ...auth, message: "invalid detail" }));
  };

  const handleInput = event =>
    setAuth({ ...auth, [event.target.name]: event.target.value });

  const phoneInput = (
    <div>
      <input
        name="phoneNumber"
        onChange={handleInput}
        value={auth.phoneNumber}
      />
      <p>
        <button onClick={signIn}>sign in</button>
      </p>
    </div>
  );

  const verifyInput = (
    <div>
      <input name="codeInput" onChange={handleInput} value={auth.codeInput} />
      <p>
        <button onClick={confirmCode}>confirm</button>
      </p>
    </div>
  );

  const detailInput = (
    <div>
      <p>{auth.user && auth.user.phoneNumber}</p>
      <p>
        <input name="email" onChange={handleInput} value={auth.email} />
        @ait.com
      </p>
      <p>
        <input name="fullName" onChange={handleInput} value={auth.fullName} />
      </p>
      <p>
        <button onClick={updateDetail}>update</button>
      </p>
      <p>
        <button onClick={signOut}>sign out</button>
      </p>
    </div>
  );

  return (
    <div>
      {auth.user && user && props.history.push("/")}
      {!auth.user && !auth.confirmResult && phoneInput}
      {!auth.user && auth.confirmResult && verifyInput}
      {auth.user && !user && detailInput}
      {auth.message && <p>{auth.message}</p>}
      <div id="recaptcha-container" />
    </div>
  );
}

export default Register;
