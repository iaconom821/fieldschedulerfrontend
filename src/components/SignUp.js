import { useState } from "react";
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

function SignUp() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [skill, setSkill] = useState("");

  let jwt_token = localStorage.getItem("token");

  function signUp(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/players", {
      method: "POST",
      headers: {
        Authorization: `bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
        skill_level: skill,
        username: userName,
        password: passWord,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        if(!resp.token){
          alert(resp.skill_level)
          return null 
        }
        (localStorage.token = resp.token)});
  }

  return (
    <div>
      <h2 style={{color: '#39FF14', margin: '0px', marginTop: '10px'}}>Signup</h2>
      <StyledForm onSubmit={(e) => signUp(e)}>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledLabel>Age</StyledLabel>
        <StyledInput
          name="age"
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <StyledLabel>Skill level</StyledLabel>
        <StyledInput
          name="skill"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <StyledLabel>UserName</StyledLabel>
        <StyledInput
          name="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <StyledLabel>Password</StyledLabel>
        <StyledInput
          name="password"
          type="password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <StyledInput type="submit" />
      </StyledForm>
    </div>
  );
}

export default SignUp;
