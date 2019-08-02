import { connect } from "react-redux";
import PlayerVolume from "../components/PlayerVolume";
import { adjustVolume } from "../reducers/playerReducer";

const PlayerButtonsContainer = connect(
  state => ({
    volume: state.player.volume
  }),
  { adjustVolume }
)(PlayerVolume);

export default PlayerButtonsContainer;
