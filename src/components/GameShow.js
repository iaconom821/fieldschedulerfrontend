import { useState, useEffect } from "react";
import {
  useParams,
  useHistory,
  Switch,
  Route,
  useRouteMatch,
  Link,
} from "react-router-dom";
import EditGame from "./EditGame.js";

function GameShow({ deleteGame }) {
  const [game, setGame] = useState("");
  const [slots, setSlots] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('')

  let { game_id } = useParams();
  let history = useHistory();
  let match = useRouteMatch();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/games/${game_id}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((games) => {
        setGame(games);
        setSlots(games.slots);
      });
    fetch(`http://localhost:3000/api/v1/players`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((players) => {
        setPlayers(players);
        setSelectedPlayer(players[0].id)
      });
  }, [game_id]);

  if (!game) {
    return <h2>Loading....</h2>;
  }

  function handleJoinGame() {
    fetch(`http://localhost:3000/api/v1/slots`, {
      method: "POST",
      headers: { 
        "content-type": 'application/json',
        Authorization: `Bearer ${localStorage.token}` },
      body: JSON.stringify({
        player_id: localStorage.userId,
        game_id: game_id,
        price: game.price 
      })
    })
      .then((r) => r.json())
      .then((players) => {
        setSlots([...slots, players]);
      });
    
      fetch(`http://localhost:3000/api/v1/players`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((r) => r.json())
        .then((player) => {
          setPlayers([...players, player]);
        });
  }

  const slotIds = slots.map((slot) => slot.player_id);

  const filteredPlayers = players.filter((player) =>
    slotIds.includes(player.id)
  );


  function handleDeleteGame() {
    fetch(`http://localhost:3000/api/v1/games/${game_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.token}` },
    }).then((r) => {
      deleteGame(game_id);
      history.push("/games");
    });
  }

  const showPlayers = filteredPlayers.map((player) => {
    return <p key={player.id}>{player.name}</p>;
  });

  function handleLeaveGame() {
    const slotId = slots.find(slot => parseInt(slot.player_id) === parseInt(localStorage.userId)).id

    fetch(`http://localhost:3000/api/v1/slots/${slotId}`, {
      method: "DELETE",
      headers: { 
        "content-type": 'application/json',
        Authorization: `Bearer ${localStorage.token}` },
      body: JSON.stringify({
        player_id: localStorage.userId,
        game_id: game_id,
        price: game.price 
      })
    })
      .then((r) => setSlots(slots.filter(slot => parseInt(slot.id) !== parseInt(slotId))));
  }

  const playerOptions = players.map(player => {
    return <option key={player.id} value={player.id}>{player.name}</option>
  })

  function handleSelectPlayer(e) {
    e.preventDefault()

    fetch(`http://localhost:3000/api/v1/slots`, {
      method: "POST",
      headers: { 
        "content-type": 'application/json',
        Authorization: `Bearer ${localStorage.token}` },
      body: JSON.stringify({
        player_id: selectedPlayer,
        game_id: game_id,
        price: game.price 
      })
    })
      .then((r) => r.json())
      .then((players) => {
        setSlots([...slots, players]);
      });
    
      fetch(`http://localhost:3000/api/v1/players`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((r) => r.json())
        .then((player) => {
          setPlayers([...players, player]);
        });
  }

  return (
    <>
      <p>{game.id}</p>
      <p>{`${new Date(game.start_time.split("Z")[0])}`}</p>
      <p>{`${new Date(game.end_time.split("Z")[0])}`}</p>
      <p>Players</p>
      {showPlayers}
      <img src={game.field.img_url} alt={game.field.id} />
      <form onSubmit={handleSelectPlayer}>
        <select onChange={(e) => setSelectedPlayer(e.target.value)}>
          {playerOptions}
        </select>
        <input type="submit" value="Add a Friend"/>
      </form>
      <button onClick={handleJoinGame}>Join Game</button>
      <button onClick={handleLeaveGame}>Leave Game</button>
      {parseInt(localStorage.userId) === parseInt(game.player_id) ? <button onClick={handleDeleteGame}>Delete Game</button> : null }
      <Link to={`${match.url}/${game.id}/edit`}>Edit Game</Link>
      <Switch>
        <Route path={`${match.url}/:game_id/edit`}>
          <EditGame />
        </Route>
      </Switch>
    </>
  );
}

export default GameShow;
