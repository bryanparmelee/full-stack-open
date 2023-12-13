import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setError, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]);

  const handleLogin = async (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    setPage("authors");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
