import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

const styleScan = {
  width: "256px"
};

const checkIn = (code) => {
  console.log(code)
}

function Scanner() {
  const [result, setResult] = useState({});

  useEffect(() => {
    if (result.code) {
      if(Object.values(result.code).length >= 10) {
        checkIn(result.code)
        setResult({...result, code: ''})
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
    </div>
  );
}

export default Scanner;
