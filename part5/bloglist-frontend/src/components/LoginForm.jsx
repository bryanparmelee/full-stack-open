import { useState } from "react";
import { useDispatch } from "react-redux";

import { loginUser } from "../reducers/authReducer";

import { Box, Typography, TextField, Button } from "@mui/material";

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
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 200,
      }}
    >
      <Typography variant="h4">Log in</Typography>

      <TextField
        size="small"
        label="username"
        value={username}
        name="Username"
        autoComplete="username"
        onChange={({ target }) => setUserName(target.value)}
      />

      <TextField
        size="small"
        label="password"
        value={password}
        name="Title"
        placeholder="Title"
        onChange={({ target }) => setPassword(target.value)}
      />

      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
