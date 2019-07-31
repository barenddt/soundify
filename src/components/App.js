import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../reducers/store";
import SideMenu from "./SideMenu";
import Browse from "./Browse";
import Player from "./Player";
import "../styles/app.scss";

export class App extends Component {
  componentDidMount() {
    SC.initialize({
      client_id: "9aB60VZycIERY07OUTVBL5GeErnTA0E4"
    });
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <div className="main-container">
          <SideMenu />
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={Browse} />
              <Route exact path="/browse" component={Browse} />
            </Switch>
            <Player />
          </div>
        </div>
      </ConnectedRouter>
    );
  }
}

export default App;
