import React from "react";

const PlayerInfo = props => {
  return (
    <div className="player-item-info">
      <img
        className="artwork"
        src={
          props.player.currentlyPlaying.artwork_url
            ? props.player.currentlyPlaying.artwork_url
            : "https://i.postimg.cc/ZnG61QfD/default-track.png"
        }
      />
      <div className="meta-data">
        {props.player.currentlyPlaying.title}
        <small className="artist">
          {props.player.currentlyPlaying.user.username.toUpperCase()}
        </small>
      </div>
    </div>
  );
};

export default PlayerInfo;
