import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FieldShow() {
  //get games logic
  const [games, setGames] = useState("");
  let { field_id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/fields/${field_id}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((games) => setGames(games));
  }, [field_id]);

  let events = [];
  if (games.games) {
    events = games.games.map((game) => {
      const startTime = game.start_time.split("Z")[0];
      const endTime = game.end_time.split("Z")[0];
      return {
        id: game.id,
        title: games.name,
        start: new Date(startTime),
        end: new Date(endTime),
      };
    });
  }
  console.log(games.games);
  return (
    <FullCalendar
      initalView="timeGridWeek"
      plugins={[timeGridPlugin]}
      events={events}
    />
  );
}

export default FieldShow;
