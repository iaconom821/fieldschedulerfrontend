import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled.form`
  justify-content: center;
`;

const StyledLabel = styled.label`
  color: #39ff14;
`;

const StyledInput = styled.input`
  margin: 0 auto;
  margin-bottom: 4px;
  display: block;
  color: magenta;
  width: 50%;
  border-radius: 5px;
  border: 1px solid black;
  text-align-last: center;
  text-align: center;
`;

function EditGame() {
  const [skill, setSkill] = useState(0);
  const [price, setPrice] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [fieldId, setFieldId] = useState("");
  const [fields, setFields] = useState([]);

  const { game_id } = useParams();
  console.log(game_id);
  const history = useHistory();

  function handleEditGame(e) {
    e.preventDefault();

    fetch(
      `https://fieldschedulerbackend.herokuapp.com/api/v1/games/${game_id}`,
      {
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
          recommended_skill: skill,
        }),
      }
    )
      .then((res) => res.json())
      .then((text) => {
        history.push(`/fields/${text.field.id}`);
      });
  }
  let fieldOptions = [];
  if (fields[0]) {
    fieldOptions = fields.map((field) => {
      return (
        <option className="fieldid" key={field.id} value={field.id}>
          {field.name}
        </option>
      );
    });
  }

  useEffect(() => {
    fetch(`https://fieldschedulerbackend.herokuapp.com/api/v1/fields/`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((r) => r.json())
      .then((games) => {
        setFields(games);
        setFieldId(games[0].id);
      });

    fetch(
      `https://fieldschedulerbackend.herokuapp.com/api/v1/games/${game_id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
    )
      .then((r) => r.json())
      .then((games) => {
        setSkill(parseInt(games.recommended_skill));
        setPrice(games.price);
        setStartTime(games.start_time.split("Z")[0]);
        setEndTime(games.end_time.split("Z")[0]);
      });
  }, [game_id]);

  return (
    <StyledForm onSubmit={handleEditGame}>
      <StyledLabel>Edit Game</StyledLabel>
      <StyledInput as="select" onChange={(e) => setFieldId(e.target.value)}>
        {fields ? fieldOptions : null}
      </StyledInput>
      <StyledInput
        type="datetime-local"
        name="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value.toString())}
      />
      <StyledInput
        type="datetime-local"
        name="end-time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value.toString())}
      />
      <StyledLabel>Recomended Skill</StyledLabel>
      <StyledInput
        type="number"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
      />
      <StyledLabel>Price</StyledLabel>
      <StyledInput
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <StyledInput as="button" type="submit">
        Submit Edited Game
      </StyledInput>
    </StyledForm>
  );
}

export default EditGame;
