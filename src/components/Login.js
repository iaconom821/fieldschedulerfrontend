import { useState } from "react";
import { useHistory } from "react-router-dom";


function Login() {
  // Login Logic
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()

  let jwt_token = localStorage.getItem("token");

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwt_token}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((userInfo) => {
        localStorage.token = userInfo.token;
        localStorage.setItem(`userId`, `${userInfo.player.id}`);
        history.push('/fields')
      });
  }

  return (
    <>
      {/* Login Form  */}
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
