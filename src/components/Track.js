import React, { useState } from "react";
import truncate from "truncate";

const Track = props => {
  const [hovering, setHovering] = useState(null);

  const renderBox = track => {
    if (hovering && hovering == track.id) {
      if (
        props.player.currentlyPlaying &&
        props.player.currentlyPlaying.id == track.id
      ) {
        return (
          <div className="s-inline-player s-active">
            <div className="s-inline-title" style={{ padding: "10px" }}>
              {truncate(track.title, 35)}
            </div>
            <i
              class={`s-icon fas fa-${
                props.player.isPlaying ? "pause" : "play"
              }-circle`}
            />
            <div className="s-inline-meta" style={{ padding: "10px" }}>
              <div>
                <i class="s-inline-icon fas fa-heart" />
                {_shorten(track.likes_count)}
              </div>
              <div>
                <i class="s-inline-icon fas fa-redo-alt" />
                {_shorten(track.reposts_count)}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="s-inline-player">
            <div className="s-inline-title" style={{ padding: "10px" }}>
              {truncate(track.title, 35)}
            </div>
            <i class="s-icon fas fa-play-circle" />
            <div className="s-inline-meta" style={{ padding: "10px" }}>
              <div>
                <i class="s-inline-icon fas fa-heart" />
                {_shorten(track.likes_count)}
              </div>
              <div>
                <i class="s-inline-icon fas fa-redo-alt" />
                {_shorten(track.reposts_count)}
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (
        props.player.currentlyPlaying &&
        props.player.currentlyPlaying.id == track.id
      ) {
        return (
          <div className="s-inline-player s-active">
            <div className="s-inline-title" style={{ padding: "10px" }}>
              {truncate(track.title, 35)}
            </div>
            <i
              class={`s-icon fas fa-${
                props.player.isPlaying ? "pause" : "play"
              }-circle`}
            />
            <div className="s-inline-meta" style={{ padding: "10px" }}>
              <div>
                <i class="s-inline-icon fas fa-heart" />
                {_shorten(track.likes_count)}
              </div>
              <div>
                <i class="s-inline-icon fas fa-redo-alt" />
                {_shorten(track.reposts_count)}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <span className="s-title-text" style={{ padding: "10px" }}>
            {track.title}
          </span>
        );
      }
    }
  };

  const _shorten = num => {
    let newNum;
    if (num > 1000000) {
      newNum = (Math.ceil(num) / 1000000).toFixed(1) + "m";
    } else if (num > 1000) {
      newNum = (Math.ceil(num) / 1000).toFixed(1) + "k";
    } else {
      newNum = num;
    }
    return newNum;
  };

  return (
    <div
      onMouseEnter={() => setHovering(props.track.id)}
      onMouseLeave={() => setHovering(null)}
      className="row-item"
      onClick={() => {
        if (
          props.player.currentlyPlaying &&
          props.player.currentlyPlaying.id == props.track.id
        ) {
          props.playPause(props.player.isPlaying);
        } else {
          props.playTrack(props.track);
        }
      }}
    >
      <div className="s-back-container" />
      <img
        src={
          props.track.artwork_url
            ? props.track.artwork_url.replace("large", "t300x300")
            : "https://i.postimg.cc/ZnG61QfD/default-track.png"
        }
        className="s-back-img"
      />
      <div className="s-title-container">
        <div className="s-back-shade" />
        <div className="s-title">{renderBox(props.track)}</div>
      </div>
    </div>
  );
};

export default Track;
