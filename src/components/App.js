import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../reducers/store";
import SideMenuContainer from "../containers/SideMenuContainer";
import PlayerContainer from "../containers/PlayerContainer";
import SearchContainer from "../containers/SearchContainer";
import TrendingContainer from "../containers/TrendingContainer";

export const App = () => {
  return (
    <ConnectedRouter history={history}>
      <div className="main-container">
        <SideMenuContainer />
        <div className="main-content">
          <Switch>
            <Route exact path="/" component={SearchContainer} />
            <Route exact path="/search" component={SearchContainer} />
            <Route exact path="/trending" component={TrendingContainer} />
          </Switch>
          <PlayerContainer />
        </div>
      </div>
    </ConnectedRouter>
  );
};

export default App;
