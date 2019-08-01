import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../reducers/store";
import SideMenuContainer from "../containers/SideMenuContainer";
import PlayerContainer from "../containers/PlayerContainer";
import BrowseContainer from "../containers/BrowseContainer";
import "../styles/app.scss";

export class App extends Component {
  componentDidMount() {
    SC.initialize({
      client_id: "9aB60VZycIERY07OUTVBL5GeErnTA0E4"
    });

    SC.get("/tracks", {
      kind: "top",
      genre: "all-music",
      region: "CA"
    }).then(function(tracks) {
      console.log(tracks);
    });
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="main-container">
          <SideMenuContainer />
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={BrowseContainer} />
              <Route exact path="/browse" component={BrowseContainer} />
            </Switch>
            <PlayerContainer />
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
