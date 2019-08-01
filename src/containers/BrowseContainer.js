import { connect } from "react-redux";
import Browse from "../components/Browse";
import { playTrack, playPause } from "../reducers/playerReducer";
import { getMore, searchTracks } from "../reducers/browseReducer";

const BrowseContainer = connect(
  state => ({
    player: state.player,
    browse: state.browse
  }),
  {
    searchTracks,
    playTrack,
    getMore,
    playPause
  }
)(Browse);

export default BrowseContainer;
