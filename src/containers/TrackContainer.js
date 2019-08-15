import { connect } from "react-redux";
import Track from "../components/Track";
import { playPause, playTrack } from "../reducers/playerReducer";

const TrackContainer = connect(
  state => ({
    player: state.player
  }),
  {
    playPause,
    playTrack
  }
)(Track);

export default TrackContainer;
