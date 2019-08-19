import { connect } from "react-redux";
import Trending from "../components/Trending";
import { getTrending } from "../reducers/tracksReducer";

const TrendingContainer = connect(
  state => ({
    tracks: state.tracks
  }),
  {
    getTrending
  }
)(Trending);

export default TrendingContainer;
