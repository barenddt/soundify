import { connect } from "react-redux";
import PlayerButtons from "../components/PlayerButtons";
import {
  playTrack,
  playPause,
  toggle,
  seekPlayer,
  playNext
} from "../reducers/playerReducer";

const PlayerButtonsContainer = connect(
  state => ({
    isPlaying: state.player.isPlaying,
    isRepeat: state.player.repeat,
    isShuffle: state.player.shuffle
  }),
  { playTrack, playPause, toggle, seekPlayer, playNext }
)(PlayerButtons);

export default PlayerButtonsContainer;
