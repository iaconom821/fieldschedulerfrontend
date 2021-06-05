import "./App.css";
import Login from "./components/Login.js";
import { Route, Switch } from "react-router-dom";
import Nav from "./components/Nav.js";
import Fields from "./components/Fields.js";
import NewGame from "./components/NewGame.js";
import NewField from "./components/NewField";
import Games from "./components/Games.js";
import SignUp from "./components/SignUp.js";
import PlayerShow from "./components/PlayerShow.js";

function App() {
  return (
    <div className="App">
      <h1 style={{color: '#FFFF00'}}>Let's Play Pick-Up Soccer</h1>
      <Nav />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/fields">
          <Fields />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route exact path="/newfield">
          <NewField />
        </Route>
        <Route exact path="/newgame">
          <NewGame />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/players/profile">
          <PlayerShow />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
