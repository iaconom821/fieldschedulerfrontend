import { useState, useEffect } from "react";

import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import FieldShow from "./FieldShow";
import styled from 'styled-components'

const StyledLink = styled(Link)`
  padding: 4px;
  margin: 2px;
  margin-top: 4px;
  border: 1px solid black;
  background: whitesmoke;
  font-size: .9em;
  text-decoration: none;
  color: magenta;
  font: Arial;
  border-radius: 3px;`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;`

const StyledInnerDiv = styled.div`
  width: 200px;`

const StyledP = styled.p`
  color: #04d9ff;`

function Fields() {
  // GET Field Logic
  const [fields, setFields] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/fields", {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    })
      .then((res) => res.json())
      .then((text) => {
        if(!localStorage.token){
          return null
        }
        setFields(text)});
  }, []);
  let match = useRouteMatch();
  const fieldLinks = fields.map((field) => {
    return (
      <StyledInnerDiv>
      <StyledLink to={`${match.url}/${field.id}`} key={field.id}>
        {field.name}
      </StyledLink>
      <StyledP>{field.address}</StyledP>
      </StyledInnerDiv>
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
      <h2 style={{color: '#FFFF00'}}>Fields</h2>
      <StyledDiv>
      {fieldLinks} 
      </StyledDiv>
      <Switch>
        {fieldRoutes}
      </Switch>
    </>
  );
}

export default Fields;
