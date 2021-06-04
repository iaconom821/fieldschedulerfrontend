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
import styled from 'styled-components'

const StyledLabel = styled.label`
  color: #39FF14;
  `

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;`

const StyledBottomDiv = styled.div`
  justify-content: center;`

const StyledP = styled.p`
  color: #04d9ff;`

const StyledButton = styled.button`
  margin: 0 auto;
  display: block;
  color: magenta;
  border-radius: 5px;
  border: 1px solid black;
  text-align-last: center;
  text-align: center;
  `
const StyledLinkTo = styled(Link)`
  margin: 0 auto;
  display: block;
  width: 100px;
  background: whitesmoke;
  text-decoration: none;
  color: magenta;
  border-radius: 5px;
  border: 1px solid black;
  text-align-last: center;
  text-align: center;`

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
    return <StyledP as='h2'>Loading....</StyledP>;
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
    return <StyledP key={player.id}>{player.name}</StyledP>;
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
      <StyledLabel as="p">Game Id: {game.id}</StyledLabel>
      <StyledLabel as='p'>Start Time: {`${new Date(game.start_time.split("Z")[0]).toDateString()} ${new Date(game.start_time.split("Z")[0]).toLocaleTimeString()}`}</StyledLabel>
      <StyledLabel as='p'>End Time: {`${new Date(game.end_time.split("Z")[0]).toDateString()} ${new Date(game.end_time.split("Z")[0]).toLocaleTimeString()}`}</StyledLabel>
      <StyledDiv>
        <img  style={{margin: '16px'}} src={game.field.img_url} alt={game.field.id} />
        <div style={{margin: '16px'}}>
          <StyledP>Players</StyledP>
          {showPlayers}
        </div>
      </StyledDiv>
      <StyledBottomDiv>
        <form onSubmit={handleSelectPlayer}>
          <StyledButton as='select' onChange={(e) => setSelectedPlayer(e.target.value)}>
            {playerOptions}
          </StyledButton>
          <StyledButton type="submit">Add Friend</StyledButton>
        </form>
        <StyledButton onClick={handleJoinGame}>Join Game</StyledButton>
        <StyledButton onClick={handleLeaveGame}>Leave Game</StyledButton>
        {parseInt(localStorage.userId) === parseInt(game.player_id) ? <StyledButton onClick={handleDeleteGame}>Delete Game</StyledButton> : null }
        <StyledLinkTo to={`${match.url}/${game.id}/edit`}>Edit Game</StyledLinkTo>
      </StyledBottomDiv>
      <Switch>
        <Route path={`${match.url}/:game_id/edit`}>
          <EditGame />
        </Route>
      </Switch>
    </>
  );
}

export default GameShow;
