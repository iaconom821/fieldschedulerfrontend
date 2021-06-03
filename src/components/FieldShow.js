import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FieldShow({ handleSetGames }) {
  //get games logic
  const [games, setGames] = useState("");
  let { id } = useParams;

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/fields/${id}`)
      .then((r) => r.json())
      .then((games) => handleSetGames(games));
  }, []);

  let events = games.map((game) => {
    return {
      id: game.id,
      title: game.id,
      start: new Date(game.start_time),
      end: new Date(game.end_time),
    };
  });
  return (
    <FullCalendar
      initalView="timeGridWeek"
      plugins={[timeGridPlugin]}
      events={events}
    />
  );
}

export default FieldShow;
