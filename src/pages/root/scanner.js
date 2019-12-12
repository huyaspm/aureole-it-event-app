import React, { useState, useEffect, useContext } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";
import { ManagerContext } from "../../utils/manager";

const styleScan = {
  width: "256px"
};

function Scanner() {
  const context = useContext(ManagerContext);
  const [result, setResult] = useState({});
  const [user, setUser] = useState();

  useEffect(() => {
    if (result.code) {
      const code = result.code;
      if (Object.values(code).length === 10) {
        axios
          .post("/manager/scan", {
            ticketCode: code
          })
          .then(res => {
            if (res && res.data) return setUser(res.data);
          })
          .then();
        setResult({ ...result, code: "", error: "" });
        setUser(null);
      }
      if (Object.values(code).length > 10) {
        setResult({ ...result, code: "", error: "invalid ticket code" });
      }
    }
  }, [result]);

  const handleScan = data => {
    if (data) setResult({ ...result, code: data });
  };

  const handleInput = event =>
    setResult({ ...result, [event.target.name]: event.target.value });

  const handleError = error => {
    if (error) setResult({ ...result, error: "device not found" });
  };

  return (
    <div>
      <QrReader
        delay={300}
        onScan={handleScan}
        style={styleScan}
        onError={handleError}
        facingMode="environment"
        showViewFinder={false}
      />
      <p>
        <input
          name="code"
          value={result.code}
          onChange={handleInput}
          placeholder="ticket code.."
        />
      </p>
      <p>{result.error}</p>
      {user && user.uid && <p>{user.email}</p>}
      <button onClick={context.signOut}>sign out</button>
    </div>
  );
}

export default Scanner;
