import { useState } from "react";
import styled from 'styled-components'

const StyledForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
`

const StyledLabel = styled.label`
  color: #39FF14;
  `

const StyledInput = styled.input`
  display: block;
  color: magenta;
  width: 100%;
  border-radius: 5px;
  border: 1px solid black;
  text-align-last: center;
  text-align: center;
  margin: 4px;
  box-sizing: border-box;
  `

function NewField(handleSetField, fieldArr) {
  // New Field Logic

  const [address, setAddress] = useState("");
  const [size, setSize] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [fieldName, setFieldName] = useState("");

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
      .then((text) => handleSetField(text));
  }

  return (
    <StyledForm onSubmit={handleNewField}>
      <StyledLabel>New Field</StyledLabel><br/>
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
      <StyledLabel as="submit" type="submit">Submit New Field</StyledLabel>
    </StyledForm>
  );
}

export default NewField;
