import "./App.css";
import Login from "./components/Login.js";
import { Switch, Route } from "react-router-dom";
import NewField from "./components/NewField";
import Nav from "./components/Nav.js";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/newfield">
          <NewField />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
