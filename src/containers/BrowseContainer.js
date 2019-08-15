import { connect } from "react-redux";
import Browse from "../components/Browse";
import { searchTracks } from "../reducers/browseReducer";

const BrowseContainer = connect(
  state => ({
    browse: state.browse
  }),
  { searchTracks }
)(Browse);

export default BrowseContainer;
