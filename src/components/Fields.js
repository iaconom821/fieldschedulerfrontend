import { useState, useEffect } from "react";

import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import FieldShow from "./FieldShow";
import styled from "styled-components";

const StyledLink = styled(Link)`
  padding: 4px;
  margin: 2px;
  margin-top: 4px;
  border: 1px solid black;
  background: whitesmoke;
  font-size: 0.9em;
  text-decoration: none;
  color: magenta;
  font: Arial;
  border-radius: 3px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const StyledInnerDiv = styled.div`
  width: 200px;
`;

const StyledP = styled.p`
  color: #04d9ff;
`;

function Fields() {
  // GET Field Logic
  const [fields, setFields] = useState([]);
  useEffect(() => {
    fetch("https://fieldschedulerbackend.herokuapp.com/api/v1/fields", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((text) => {
        if (!localStorage.token) {
          return null;
        }
        setFields(text);
      });
  }, []);

  let match = useRouteMatch();

  if (!localStorage.userId) {
    return <h2>Please Log In or Sign Up</h2>;
  }

  if (!fields[0]) {
    return <h2 style={{ color: "#00FFFF" }}>Loading...</h2>;
  }
  const fieldLinks = fields.map((field) => {
    return (
      <StyledInnerDiv key={field.id}>
        <StyledLink to={`${match.url}/${field.id}`}>{field.name}</StyledLink>
        <StyledP>{field.address}</StyledP>
      </StyledInnerDiv>
    );
  });

  const fieldRoutes = fields.map((field) => {
    return (
      <Route key={field.address} path={`${match.url}/:field_id`}>
        <FieldShow />
      </Route>
    );
  });

  return (
    <>
      <h2 style={{ color: "#FFFF00" }}>Fields</h2>
      <StyledDiv>{fieldLinks}</StyledDiv>
      <Switch>{fieldRoutes}</Switch>
    </>
  );
}

export default Fields;
