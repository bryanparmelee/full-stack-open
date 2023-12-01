import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../reducers/authReducer";

const LoginForm = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(loginUser({ username, password }));
    setUserName("");
    setPassword("");
  };

  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            autoComplete="username"
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
