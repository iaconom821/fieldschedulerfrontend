import {useState, useEffect} from 'react'
import { useParams, useHistory, Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import EditGame from './EditGame.js'

function GameShow({deleteGame}) {
  const [game, setGame] = useState('')
  const [slots, setSlots] = useState([])
  const [players, setPlayers] = useState([])

  let {game_id} = useParams()
  let history = useHistory()
  let match = useRouteMatch()
  

  
  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/games/${game_id}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((games) => {
        console.log(games)
        setGame(games)
        setSlots(games.slots)});
    fetch(`http://localhost:3000/api/v1/players`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((players) => {
        setPlayers(players)})
    }, [game_id])
    
    if(!game) {
      return <h2>Loading....</h2>
    }

    const slotIds = slots.map(slot => slot.player_id)

    const filteredPlayers = players.filter(player => slotIds.includes(player.id))

    console.log(filteredPlayers)

    function handleDeleteGame() {
      fetch(`http://localhost:3000/api/v1/games/${game_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then(r => {
        deleteGame(game_id)
        history.push("/games")
      })
  }


  const showPlayers = filteredPlayers.map(player => {
    return (
      <p>{player.name}</p>
    )
  })



    return (
      <>
        <p>{game.id}</p>
        <p>{`${new Date(game.start_time.split('Z')[0])}`}</p>
        <p>{`${new Date(game.end_time.split('Z')[0])}`}</p>
        <p>Players</p>
        {showPlayers}
        <img src={game.field.img_url} alt={game.field.id}/>
        <button onClick={handleDeleteGame}>Delete Game</button>
        <Link to={`${match.url}/${game_id}/edit`}>Edit Game</Link>
        <Switch>
          <Route path={`${match.url}/:game_id/edit`}>
            <EditGame /> 
          </Route>
        </Switch>
        
    </>
  )
}

export default GameShow;
