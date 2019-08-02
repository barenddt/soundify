import { connect } from "react-redux";
import PlayerSeekBar from "../components/PlayerSeekBar";
import { seekPlayer } from "../reducers/playerReducer";

const PlayerSeekBarContainer = connect(
  state => ({
    player: state.player
  }),
  {
    seekPlayer
  }
)(PlayerSeekBar);

export default PlayerSeekBarContainer;
