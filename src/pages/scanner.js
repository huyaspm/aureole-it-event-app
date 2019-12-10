import React, { useState } from "react";
import QrReader from "react-qr-reader";

const style = {
  width: "256px"
};

function Scanner() {
  const [result, setResult] = useState({});

  const handleScan = data => {
    if (data) setResult({ ...result, code: data });
  };

  const handleError = error => {
    if (error) setResult({ ...result, error: error.message.toLowerCase() });
  };

  return (
    <div>
      <QrReader
        delay={300}
        onScan={handleScan}
        style={style}
        onError={handleError}
        facingMode="environment"
        showViewFinder={false}
      />
      <p>{result.code}</p>
      <p>{result.error}</p>
    </div>
  );
}

export default Scanner;
