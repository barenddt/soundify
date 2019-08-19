import { connect } from "react-redux";
import TrackList from "../components/TrackList";

const TrackListContainer = connect(state => ({
  tracks: state.tracks,
  menu: state.menu
}))(TrackList);

export default TrackListContainer;
