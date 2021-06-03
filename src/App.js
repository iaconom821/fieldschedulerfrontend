import "./App.css";
import Login from "./components/Login.js";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.js";
import Fields from "./components/Fields.js";
import NewGame from "./components/NewGame.js";
import GameShow from "./components/GameShow.js";

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
      </Switch>
    </div>
  );
}

export default App;
