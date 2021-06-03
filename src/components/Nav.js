import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/newfield"> New Field</Link>
    </div>
  );
}

export default Nav;
