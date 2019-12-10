import React, { useState, useEffect } from "react";
import firebase from "../config/firebase-config";

const initialState = {
  user: null,
  message: "",
  codeInput: "",
  phoneNumber: "+84",
  confirmResult: null
};

function Register(props) {
  const [auth, setAuth] = useState(initialState);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (!mount) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) setAuth({ ...auth, user: user.toJSON() });
        else setAuth(initialState);
      });
      setMount(true);
    }
  }, [auth, mount]);

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
      .catch(err => setAuth({ ...auth, message: `invalid phone number` }));
  };

  const confirmCode = () => {
    if (auth.codeInput.length && auth.confirmResult) {
      auth.confirmResult
        .confirm(auth.codeInput)
        .then(() => setAuth({ ...auth, message: "code confirmed" }))
        .catch(() => setAuth({ ...auth, message: `invalid code` }));
    }
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
      <button onClick={signIn}>sign in</button>
    </div>
  );

  const verifyInput = (
    <div>
      <input name="codeInput" onChange={handleInput} value={auth.codeInput} />
      <button onClick={confirmCode}>confirm</button>
    </div>
  );

  return (
    <div>
      {!auth.user && !auth.confirmResult && phoneInput}
      {!auth.user && auth.confirmResult && verifyInput}
      {auth.user && (
        <div>
          <p>{auth.user.uid}</p>
          <button onClick={() => props.history.push("/")}>homepage</button>
        </div>
      )}
      {auth.message && <p>{auth.message}</p>}
      <div id="recaptcha-container" />
    </div>
  );
}

export default Register;
