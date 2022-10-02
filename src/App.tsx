import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AnonLogin from "./pages/AnonLogin";
import ChatRoom from "./pages/ChatRoom";
import Homepage from "./pages/Homepage";
import Landingpage from "./pages/Landingpage";
import Room from "./pages/Room";
import WrongUrl from "./pages/WrongUrl";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact children={<Homepage />} />
          <Route path="/anonLogin" exact children={<AnonLogin />} />
          <PrivateRoute path="/" exact component={Landingpage} />
          <PrivateRoute path="/room/:roomId" exact component={Room} />
          <PrivateRoute path="/chatroom/:roomId" exact component={ChatRoom} />
          <Route path="*" component={WrongUrl} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
