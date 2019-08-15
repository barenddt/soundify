import { connect } from "react-redux";
import TrackList from "../components/TrackList";
import { getMore } from "../reducers/browseReducer";

const TrackListContainer = connect(
  state => ({ browse: state.browse }),
  {
    getMore
  }
)(TrackList);

export default TrackListContainer;
