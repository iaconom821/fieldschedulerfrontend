import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  margin: 4px;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 3px;
  color: violet;
  background: whitesmoke;
  padding: 4px;
  font-weight: bold;
`;

const StyledDiv = styled.div`
  width: 90%;
  margin: auto;
`;

function FieldShow() {
  //get games logic
  const [games, setGames] = useState("");
  let { field_id } = useParams();

  useEffect(() => {
    fetch(
      `https://fieldschedulerbackend.herokuapp.com/api/v1/fields/${field_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
    )
      .then((r) => r.json())
      .then((games) => setGames(games));
  }, [field_id]);

  let events = [];
  let gamesList = [];
  if (games.games) {
    events = games.games.map((game) => {
      const startTime = game.start_time.split("Z")[0];
      const endTime = game.end_time.split("Z")[0];
      return {
        id: game.id,
        title: `${games.name} ${game.id}`,
        start: new Date(startTime),
        end: new Date(endTime),
      };
    });

    gamesList = games.games.map((game) => {
      return (
        <StyledLink
          key={game.id}
          to={(location) => (location.pathname = `/games/${game.id}`)}
        >
          {game.id}
        </StyledLink>
      );
    });
  }

  return (
    <>
      <h2 style={{ color: "#FFFF00" }}>{games.name}</h2>
      {gamesList}
      <StyledDiv>
        <FullCalendar
          initalView="timeGridWeek"
          plugins={[timeGridPlugin]}
          events={events}
        />
      </StyledDiv>
    </>
  );
}

export default FieldShow;
