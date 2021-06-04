import { useState, useEffect } from "react";
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import GameShow from "./GameShow";
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;`

const StyledLink = styled(Link)`
  padding: 4px;
  margin: 2px;
  border: 1px solid black;
  background: whitesmoke;
  font-size: .9em;
  text-decoration: none;
  color: magenta;
  font: Arial;
  width: 100px;`

function Games() {
  // GET Field Logic
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/games", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((text) => {
        if(!localStorage.token){
            return null
        }
        setGames(text)});
  }, []);
  let match = useRouteMatch();
  
  if(!games[0]){
      return <h2>Loading...</h2>
  }

  const gameLinks = games.map((game) => {
    return (
      <StyledLink to={`${match.url}/${game.id}`} id={game.id} key={game.id}>
        {game.field.name} {game.id}
      </StyledLink> 
    );
  });

  function deleteGame (id) {
    const delGame = games.filter(game=> `${game.id}` !== `${id}`)
    setGames(delGame)
  }

  const gameRoutes = games.map((game) => {
    return (
      <Route path={`${match.url}/:game_id`} key={game.id}>
        <GameShow deleteGame={deleteGame} />
      </Route>
    );
  });

  return (
    <>
      <h2 style={{color: '#FFFF00'}}>Games</h2>
      <StyledDiv>
        {gameLinks}
      </StyledDiv>
      <Switch>{gameRoutes}</Switch>
    </>
  );
}

export default Games;