import React, { useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import TrackListContainer from "../containers/TrackListContainer";

const Search = props => {
  useEffect(() => {
    $("#search-container").unbind("scroll");
    $("#search-container").on("scroll", () => {
      if (
        $("#search-container").scrollTop() +
          $("#search-container").innerHeight() >=
        $("#search-container")[0].scrollHeight - 300
      ) {
        props.getMore();
      }
    });
  });

  return (
    <div id="search-container" className="container">
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={e => props.searchTracks(e.target.value)}
        autoFocus
        className="search-bar"
        placeholder="Search for music..."
      />
      <TrackListContainer page="search" />
    </div>
  );
};

export default Search;
