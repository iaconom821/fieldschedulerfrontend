import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

const StyledForm = styled.form`
  position: relative;
  margin: auto;
  text-align: center;
  justify-content: center;
  padding: 5px;
`

const StyledLabel = styled.label`
  color: #39FF14;
  text-align: center;
  margin: 10px;
  `

const StyledInput = styled.input`
  display: block;
  color: magenta;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
  margin: auto;
  box-sizing: border-box;
  `

function Login() {
  // Login Logic
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

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
        if(!userInfo.token){
          alert("Invalid Username or Password")
          return null
        }
        localStorage.token = userInfo.token;
        localStorage.setItem(`userId`, `${userInfo.player.id}`);
        history.push("/fields");
      });
  }

  return (
    <>
      {/* Login Form  */}
      <StyledLabel as="h2">Login</StyledLabel>
      <StyledForm onSubmit={handleLogin}>
        <StyledLabel>Username</StyledLabel>
        <StyledInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledLabel>Password</StyledLabel>
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledInput as="button" style={{marginTop: '4px'}} type="submit">Login</StyledInput >
      </StyledForm>
    </>
  );
}

export default Login;
