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
    currentlyPlaying: state.player.currentlyPlaying,
    isPlaying: state.player.isPlaying,
    repeat: state.player.repeat,
    shuffle: state.player.shuffle,
    tracks: state.browse.tracks
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
