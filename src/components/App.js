import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../reducers/store";
import SideMenuContainer from "../containers/SideMenuContainer";
import PlayerContainer from "../containers/PlayerContainer";
import BrowseContainer from "../containers/BrowseContainer";

export const App = () => {
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
};

export default App;
