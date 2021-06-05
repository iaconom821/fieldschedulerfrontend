import { useState } from "react";
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const StyledForm = styled.form`
  position: relative;
  margin: auto;
  text-align: center;
  justify-content: center;
  padding: 5px;
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
  box-sizing: border-box;
  `

function NewField() {
  // New Field Logic

  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [fieldName, setFieldName] = useState("");

  const history = useHistory()

  function handleNewField(e) {
    e.preventDefault();

    fetch("http://localhost:3000/api/v1/fields", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: JSON.stringify({
        address: address,
        size: size,
        img_url: imgUrl,
        name: fieldName,
      }),
    })
      .then((res) => res.json())
      .then((text) => history.push(`/fields/${text.id}`));
  }

  if(!localStorage.userId){
    return <h2>Please Log In or Sign Up</h2>
  }

  return (
    <StyledForm onSubmit={handleNewField}>
      <StyledLabel style={{fontWeight: "bolder"}}>New Field</StyledLabel><br/>
      <br/>
      <StyledLabel>Address</StyledLabel>
      <StyledInput
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <StyledLabel>Field Dimensions</StyledLabel>
      <StyledInput
        type="text"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <StyledLabel>Image URL</StyledLabel>
      <StyledInput
        type="url"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <StyledLabel>Field Name</StyledLabel>
      <StyledInput
        type="text"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      />
      <StyledInput as="button" type="submit">Submit New Field</StyledInput>
    </StyledForm>
  );
}

export default NewField;
