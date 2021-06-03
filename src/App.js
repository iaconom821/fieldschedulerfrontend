import "./App.css";
import Login from "./components/Login.js";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.js";
import Fields from "./components/Fields.js";
import NewGame from "./components/NewGame.js";
import GameShow from "./components/GameShow.js";
import NewField from "./components/NewField";
import FieldShow from "./components/FieldShow";

function App() {
  return (
    <div className="App">
      <h1>FieldScheduler</h1>
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/fields">
          <Fields />
        </Route>
        <Route path="/game/:id">
          <GameShow />
        </Route>
        <Route exact path="/newfield">
          <NewField />
        </Route>
        <Route exact path="/newgame">
          <NewGame />
        </Route>
        <Route path="/field/id">
          <FieldShow />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
