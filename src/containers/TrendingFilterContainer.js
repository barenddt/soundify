import { connect } from "react-redux";
import TrendingFilter from "../components/TrendingFilter";
import { getTrending } from "../reducers/tracksReducer";

const TrendingFilterContainer = connect(
  null,
  { getTrending }
)(TrendingFilter);

export default TrendingFilterContainer;
