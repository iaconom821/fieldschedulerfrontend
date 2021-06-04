import { useState } from "react";

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
      .then((resp) => (localStorage.token = resp.token));
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={(e) => signUp(e)}>
        <label>name</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Age</label>
        <input
          name="age"
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Skill level</label>
        <input
          name="skill"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <label>UserName</label>
        <input
          name="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={passWord}
          onChange={(e) => setPassWord(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignUp;
