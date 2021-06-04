import { useState, useEffect } from 'react'
import styled from 'styled-components'

const StyledP = styled.p`
    color: #ff1818;`

function PlayerShow() {
    const [player, setPlayer] = useState(null)

    useEffect(() => {
    fetch(`http://localhost:3000/api/v1/players/${localStorage.userId}`, {
    headers: { Authorization: `Bearer ${localStorage.token}` },
    })
    .then((r) => r.json())
    .then((player) => {
        if(!player.name){
            return null
        }
        setPlayer(player);
    });
    }, [])

    if(!player){
        return <h2>Loading...</h2>
    }

    let games = []
    if(player.slots[0]){
        games = player.slots.map(game => {
            return <StyledP key={game.id}>Game Id: {game.game_id}</StyledP>
        })
    }

    return (
        <>
        <StyledP as="h2">Player Profile</StyledP>
        <StyledP>Name: {player.name}</StyledP>
        <StyledP>Age: {player.age}</StyledP>
        <StyledP>Skill Level: {player.skill_level}</StyledP>
        <StyledP>Username: {player.username}</StyledP>
        <ul>
            {games}
        </ul>
        </>
    )
}

export default PlayerShow