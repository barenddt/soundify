import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import menuReducer from "./menuReducer";
import playerReducer from "./playerReducer";
import browseReducer from "./browseReducer";

export default history =>
  combineReducers({
    menu: menuReducer,
    player: playerReducer,
    browse: browseReducer,
    router: connectRouter(history)
  });
