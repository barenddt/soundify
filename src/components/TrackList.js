import React from "react";
import TrackContainer from "../containers/TrackContainer";

const TrackList = props => {
  $("#cont").on("scroll", () => {
    if (
      $("#cont").scrollTop() + $("#cont").innerHeight() >=
      $("#cont")[0].scrollHeight - 300
    ) {
      props.getMore();
    }
  });

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
