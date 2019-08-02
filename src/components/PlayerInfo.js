import React from "react";

const PlayerInfo = props => {
  return (
    <div className="player-item-info">
      <img
        className="artwork"
        src={
          props.currentlyPlaying.artwork_url
            ? props.currentlyPlaying.artwork_url
            : "https://i.postimg.cc/ZnG61QfD/default-track.png"
        }
      />
      <div className="meta-data">
        {props.currentlyPlaying.title}
        <small className="artist">
          {props.currentlyPlaying.user.username.toUpperCase()}
        </small>
      </div>
    </div>
  );
};

export default PlayerInfo;
