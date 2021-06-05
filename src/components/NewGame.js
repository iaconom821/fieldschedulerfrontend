import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'

const StyledForm = styled.form`
  position: relative;
  margin: auto;
  text-align: center;
  justify-content: center;
  padding: 5px;
  width: fit-content;
`

const StyledLabel = styled.label`
  color: #39FF14;
  `

const StyledInput = styled.input`
  display: block;
  color: magenta;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
  margin: auto;
  text-align-last: center;
  width: 100%;
  box-sizing: border-box;
  `

function NewGame() {
  // New Game logic
  const [skill, setSkill] = useState(0);
  const [price, setPrice] = useState(0);
  const [startTime, setStartTime] = useState(new Date(Date.now()).toISOString().split('Z')[0]);
  const [endTime, setEndTime] = useState(new Date(Date.now()).toISOString().split('Z')[0]);
  const [fieldId, setFieldId] = useState("");
  const [fields, setFields] = useState([]);
  
  

  console.log()

  const history = useHistory()

  function handleNewGame(e) {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/games", {
      method: "POST",
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
        //console.log(text)
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
        if(!localStorage.token){
          return null
        }
        setFields(games)
        if(!games[0]){
          return null
        }
        setFieldId(games[0].id)
      });
  }, []);

  if(!localStorage.userId){
    return <h2>Please Log In or Sign Up</h2>
  }

  return (
    <StyledForm onSubmit={handleNewGame}>
      <StyledLabel style={{fontWeight: "bolder"}}>New Game</StyledLabel><br/>
      <br/>
      <StyledLabel>Fields</StyledLabel>
      <StyledInput as='select' onChange={(e) => setFieldId(e.target.value)}>
        {fields ? fieldOptions : null}
      </StyledInput>
      <StyledLabel>Start Time</StyledLabel>
      <StyledInput
        type="datetime-local"
        name="start-time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value.toString())}
      />
      <StyledLabel>End Time</StyledLabel>
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
      <StyledInput as='button' type="submit">Submit New Game</StyledInput>
    </StyledForm>
  );
}

export default NewGame;
