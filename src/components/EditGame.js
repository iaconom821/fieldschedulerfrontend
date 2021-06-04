import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function EditGame() {

  const [skill, setSkill] = useState(0);
  const [price, setPrice] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState('');
  const [fieldId, setFieldId] = useState("");
  const [fields, setFields] = useState([]);

  const {game_id} = useParams()
    console.log(game_id)
  const history = useHistory()

  function handleEditGame(e) {
    e.preventDefault();

    fetch(`http://localhost:3000/api/v1/games/${game_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        price: price,
        start_time: startTime,
        end_time: endTime,
        field_id: parseInt(fieldId),
        player_id: `${localStorage.userId}`,
        recommended_skill: skill
      }),
    })
      .then((res) => res.json())
      .then((text) => {
        history.push(`/fields/${text.field.id}`)
      });
  }
  let fieldOptions = [];
  if (fields[0]) {
    fieldOptions = fields.map((field) => {
      return (
        <option className='fieldid' key={field.id} value={field.id}>
          {field.name}
        </option>
      );
    });
  }

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/fields/`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((games) => {
        setFields(games)
        setFieldId(games[0].id)
      });
    
      fetch(`http://localhost:3000/api/v1/games/${game_id}`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((r) => r.json())
        .then((games) => {
          setSkill(parseInt(games.recommended_skill))
          setPrice(games.price)
          setStartTime(games.start_time.split('Z')[0])
          setEndTime(games.end_time.split('Z')[0])
        });
  }, [game_id]);

  return (
    <form onSubmit={handleEditGame}>
      <label>Edit Game</label>
      <select onChange={(e) => setFieldId(e.target.value)}>
        {fields ? fieldOptions : null}
      </select>
      <input
        type="datetime-local"
        name="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value.toString())}
      />
      <input
        type="datetime-local"
        name="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value.toString())}
      />
      <label>Recomended Skill</label>
      <input
        type="number"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <label>Price</label>
      <input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Submit Edited Game</button>
    </form>
  );
}

export default EditGame;