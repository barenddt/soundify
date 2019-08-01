import { connect } from "react-redux";
import Player from "../components/Player";
import {
  playPause,
  playTrack,
  seekPlayer,
  adjustVolume,
  toggle
} from "../reducers/playerReducer";

const PlayerContainer = connect(
  state => ({
    player: state.player,
    browse: state.browse
  }),
  {
    playPause,
    playTrack,
    seekPlayer,
    adjustVolume,
    toggle
  }
)(Player);

export default PlayerContainer;
