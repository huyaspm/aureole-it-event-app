import React, { useContext, useState } from "react";
import { ManagerContext } from "../../utils/manager";
import axios from "axios";

function Manager(props) {
  const context = useContext(ManagerContext);
  const [manager, setManager] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState();

  const handleInput = event => {
    setManager({ ...manager, [event.target.name]: event.target.value });
  };

  const signIn = () => {
    axios
      .post("/manager", {
        username: manager.username,
        password: manager.password
      })
      .then(res => {
        if (res && res.data) {
          context.signIn(res.data);
          props.history.push("/root/scanner");
        } else setMessage("user not found");
      })
      .catch(() => setMessage("sign in failed"));
  };

  return (
    <div>
      {context.manager &&
        context.manager.username &&
        props.history.push("/root/scanner")}
      <p>
        <input
          name="username"
          onChange={handleInput}
          value={manager.username}
        />
      </p>
      <p>
        <input
          name="password"
          onChange={handleInput}
          value={manager.password}
          type="password"
        />
      </p>
      <button onClick={signIn}>sign in</button>
      <p>{message}</p>
    </div>
  );
}

export default Manager;
