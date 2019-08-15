import React, { useState, useEffect } from "react";
import TrackContainer from "../containers/TrackContainer";

const TrackList = props => {
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getMore();
    }, 500);
  });

  const getMore = () => {
    $("#cont").on("scroll", () => {
      if (
        $("#cont").scrollTop() + $("#cont").innerHeight() >=
        $("#cont")[0].scrollHeight - 300
      ) {
        if (!refreshing) {
          props.getMore(props.browse.next_href);
        }
        setRefreshing(true);
      }
    });
  };

  const makeTracks = () => {
    let tracks = [];
    let sTracks = props.browse.tracks;
    sTracks.forEach(track => {
      tracks.push(<TrackContainer track={track} />);
    });
    return tracks;
  };

  return <div className="row">{makeTracks()}</div>;
};

export default TrackList;
