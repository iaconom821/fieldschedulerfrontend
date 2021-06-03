import { useState, useEffect } from "react";

import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import FieldShow from "./FieldShow";

function Fields() {
  // GET Field Logic
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/fields", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((text) => setFields(text));
  }, []);
  let match = useRouteMatch();
  const fieldLinks = fields.map((field) => {
    return (
      <Link to={`${match.url}/${field.id}`} key={field.id}>
        {field.name}
      </Link>
    );
  });

  const fieldRoutes = fields.map((field) => {
    return (
      <Route path={`${match.url}/:field_id`} key={field.id}>
        <FieldShow />
      </Route>
    );
  });

  return (
    <>
      {fieldLinks}
      <Switch>{fieldRoutes}</Switch>
    </>
  );
}

export default Fields;
