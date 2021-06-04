import { useState, useEffect } from 'react'

function PlayerShow() {
    const [player, setPlayer] = useState(null)

    useEffect(() => {
    fetch(`http://localhost:3000/api/v1/players/${localStorage.userId}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
    })
    .then((r) => r.json())
    .then((player) => {
        setPlayer(player);
    });
    }, [])

    if(!player){
        return <h2>Loading....</h2>
    }

    let games = []
    if(player.slots[0]){
        games = player.slots.map(game => {
            return <p key={game.id}>Game Id: {game.game_id}</p>
        })
    }

    return (
        <>
        <p>Name: {player.name}</p>
        <p>Age: {player.age}</p>
        <p>Skill Level: {player.skill_level}</p>
        <p>Username: {player.username}</p>
        <ul>
            {games}
        </ul>
        </>
    )
}

export default PlayerShow