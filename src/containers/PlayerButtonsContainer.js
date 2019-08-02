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
    browse: state.browse,
    player: state.player
  }),
  { playTrack, playPause, toggle, seekPlayer, playNext }
)(PlayerButtons);

export default PlayerButtonsContainer;
