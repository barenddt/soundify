import React from "react";
import TrackContainer from "../containers/TrackContainer";

const TrackList = props => {
  const makeTracks = () => {
    let tracks = [];
    let sTracks = props.tracks[props.page];
    sTracks.forEach(track => {
      tracks.push(<TrackContainer track={track} />);
    });

    return tracks;
  };

  return <div className="row">{makeTracks()}</div>;
};

export default TrackList;
