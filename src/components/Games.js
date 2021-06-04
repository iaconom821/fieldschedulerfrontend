import { useState, useEffect } from "react";

import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import GameShow from "./GameShow";

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
      <Link to={`${match.url}/${game.id}`} id={game.id} key={game.id}>
        {game.field.name} {game.id}
      </Link>
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
      {gameLinks}
      <Switch>{gameRoutes}</Switch>
    </>
  );
}

export default Games;