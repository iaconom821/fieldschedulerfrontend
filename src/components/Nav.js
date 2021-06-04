import { Link, useHistory } from "react-router-dom";

function Nav() {
  let history = useHistory();

  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/newfield"> New Field</Link>
      <Link to="/newgame">New Game</Link>
      <Link to="/fields">Fields</Link>
      <Link to="/games">Games</Link>
      <Link to={`/players/profile`}>Profile</Link>
      <button
        onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}
      >
        Log Out
      </button>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Nav;
