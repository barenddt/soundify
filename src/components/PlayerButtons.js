import React from "react";

const PlayerButtons = props => {
  return (
    <div className="player-item-buttons">
      <i
        onClick={() => props.toggle("repeat")}
        className={`p-icon-xs${
          props.isRepeat ? "-active" : ""
        } fas fa-redo-alt`}
      />
      <i
        onClick={() => props.seekPlayer(0)}
        className="p-icon-sm fas fa-step-backward"
      />
      <i
        onClick={() => props.playPause(props.isPlaying)}
        className={`p-icon ${
          props.isPlaying ? "fas fa-pause-circle" : "fas fa-play-circle"
        }`}
      />
      <i
        onClick={() => props.playNext()}
        className="p-icon-sm fas fa-step-forward"
      />
      <i
        onClick={() => props.toggle("shuffle")}
        className={`p-icon-xs${props.isShuffle ? "-active" : ""} fas fa-random`}
      />
    </div>
  );
};

export default PlayerButtons;
