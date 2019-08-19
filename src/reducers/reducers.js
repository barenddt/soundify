import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import menuReducer from "./menuReducer";
import playerReducer from "./playerReducer";
import tracksReducer from "./tracksReducer";

export default history =>
  combineReducers({
    menu: menuReducer,
    player: playerReducer,
    tracks: tracksReducer,
    router: connectRouter(history)
  });
