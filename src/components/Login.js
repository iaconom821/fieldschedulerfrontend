import { useState } from "react";

function Login() {
  // Login Logic 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((userInfo) => {
        console.log(userInfo)
        localStorage.token = userInfo.token;
      });
  }

  // New Field Logic

  const [address, setAddress] = useState('');
  const [size, setSize] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  function handleNewField(e) {
    e.preventDefault();

    fetch(fetch('http://localhost:3000/api/v1/fields', {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.token}`},
        body: JSON.stringify({
          address: address,
          size: size,
          img_url: imgUrl
        })
      })
      .then(res=>res.json())
      .then(text=>console.log(text)))
  }

  // GET Field Logic
  // fetch('http://localhost:3000/api/v1/fields', {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(res=>res.json()).then(text=>console.log(text))

  

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

    {/* New Field Form */}
    <form onSubmit={handleNewField}>
      <label>New Field</label>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <input 
        type="url" 
        placeholder="Image URL"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <button type="submit">Submit New Field</button>
    </form>
    </>
  );
}

export default Login;
