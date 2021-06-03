import { useState } from "react";

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
    <form onSubmit={handleNewField}>
      <label>New Field</label>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <input
        type="url"
        placeholder="Image URL"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="Field Name"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
      />
      <button type="submit">Submit New Field</button>
    </form>
  );
}

export default NewField;
