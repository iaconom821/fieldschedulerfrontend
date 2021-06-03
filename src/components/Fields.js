import { useState, useEffect } from "react";
import NewField from "./NewField";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NewGame from "./NewGame";
import GameShow from "./GameShow";
import FieldShow from "./FieldShow";
import Nav from "./Nav";

function Fields() {
  // GET Field Logic
  const [fields, setFields] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/fields", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((text) => setFields(text));
  }, []);
  //   let fieldOptions = [];
  //   if (fields[0]) {
  //     fieldOptions = fields.map((field) => {
  //       return (
  //         <option key={field.id} value={field.id}>
  //           {field.name}
  //         </option>
  //       );
  //     });
  //   }
  function handleSetField(newField) {
    setFields([...fields, newField]);
  }

  function handleSetGames(newGame) {
    setGames([...games, newGame]);
  }
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path="/newfield">
        <NewField handleSetField={handleSetField} />
      </Route>
      <Route path="/newgame">
        <NewGame fieldsArr={fields} handleSetGames={handleSetGames} />
      </Route>
      <Route path="/field/id">
        <FieldShow handleSetGames={handleSetGames} />
      </Route>
    </Switch>
  );
}

export default Fields;
