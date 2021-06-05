import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledP = styled.p`
    color: #ff1818;`

const StyledLink = styled(Link)`
    color: #ff1818;
    display: block;
    text-align: center;
    text-decoration: none;`

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;`

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

    if(!localStorage.userId){
        return <h2>Please Log In or Sign Up</h2>
    }

    if(!player){
        return <h2>Loading...</h2>
    }

    let games = []
    let organizedGames = []
    if(player.slots[0]){
        games = player.slots.map(game => {
            return <StyledLink key={game.id} to={location => location.pathname = `/games/${game.game_id}`}>Game: {game.game_id}</StyledLink>
        })

        organizedGames = player.games.map(game => {
            return <StyledLink key={game.id} to={location => location.pathname = `/games/${game.id}`}>Game: {game.id}</StyledLink>
        })
    }

    return (
        <>
        <StyledP as="h2">Player Profile</StyledP>
        <StyledDiv>
            <div>
                <StyledP>Name: {player.name}</StyledP>
                <StyledP>Age: {player.age}</StyledP>
                <StyledP>Skill Level: {player.skill_level}</StyledP>
                <StyledP>Username: {player.username}</StyledP>
            </div>
            <div>
            <StyledP>Games Organized:</StyledP>
                <ul>
                    {organizedGames}
                </ul>
                
            </div>
            <div>
                <StyledP>Playing In:</StyledP>
                <ul>
                    {games}
                </ul>
            </div>
        </StyledDiv>
        </>
    )
}

export default PlayerShow