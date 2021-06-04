import { Link, useHistory } from "react-router-dom";
import styled from 'styled-components'

const StyledLink = styled(Link)`
  padding: 4px;
  margin: 2px;
  border: 1px solid black;
  background: whitesmoke;
  font-size: .9em;
  text-decoration: none;
  color: magenta;
  font: Arial;`

function Nav() {
  let history = useHistory();
  


  return (
    <div>
      <StyledLink to="/signup">Sign Up</StyledLink>
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to={`/players/profile`}>Profile</StyledLink>
      <StyledLink to="/newfield">New Field</StyledLink>
      <StyledLink to="/fields">Fields</StyledLink>
      <StyledLink to="/newgame">New Game</StyledLink>
      <StyledLink to="/games">Games</StyledLink>
      <StyledLink as='button'
          onClick={() => {
          localStorage.clear();
          history.push("/login");
        }}
      >
        Log Out
      </StyledLink>
    </div>
  );
}

export default Nav;
