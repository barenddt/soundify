import React, { useEffect } from "react";
import TrackListContainer from "../containers/TrackListContainer";
import TrendingFilterContainer from "../containers/TrendingFilterContainer";

const Trending = (props) => {
  useEffect(() => {
    if (props.tracks.trending.length == 0) {
      props.getTrending({
        kind: "top",
        genre: "soundcloud:genres:all-music",
        region: "soundcloud:regions:CA",
        limit: "50"
      });
    }
  });

  return (
    <div id="cont" className="container">
      <TrackListContainer page="trending" />
    </div>
  );
};

export default Trending;
