import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/newfield"> New Field</Link>
      <Link to="/newgame">New Game</Link>
      <Link to="/fields">Fields</Link>
      <Link to="/games">Games</Link> 
      <button onClick={()=>localStorage.clear()}>Log Out</button>
    </div>
  );
}

export default Nav;
