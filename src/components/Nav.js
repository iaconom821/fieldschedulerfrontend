import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <button>Home</button>
      <Link to="/login">Login</Link>
      <Link to="/newfield"> New Field</Link>
      <Link to="/newgame">New Game</Link>
      <Link to="/fields">Fields</Link>
      <button>Schedule a game</button>
    </div>
  );
}

export default Nav;
