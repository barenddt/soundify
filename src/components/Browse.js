import React from "react";
import { DebounceInput } from "react-debounce-input";
import TrackListContainer from "../containers/TrackListContainer";

const Browse = props => {
  return (
    <div id="cont" className="container">
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={e => props.searchTracks(e.target.value)}
        autoFocus
        className="search-bar"
        placeholder="Search for music..."
      />
      <TrackListContainer />
    </div>
  );
};

export default Browse;
