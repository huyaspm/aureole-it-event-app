import React from "react";

function Notfound(props) {
  return (
    <div>
      <p>404, not found</p>
      <button onClick={() => props.history.push("/")}>homepage</button>
    </div>
  );
}

export default Notfound;
