import { connect } from "react-redux";
import Search from "../components/Search";
import { searchTracks } from "../reducers/tracksReducer";
import { getMore } from "../reducers/tracksReducer";

const SearchContainer = connect(
  state => ({
    tracks: state.tracks
  }),
  { searchTracks, getMore }
)(Search);

export default SearchContainer;
