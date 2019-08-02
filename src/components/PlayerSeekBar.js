import React, { useState } from "react";

const PlayerSeekbar = props => {
  const [trackPos, setTrackPos] = useState(0);
  const [tip, setTip] = useState("none");
  const [timestamp, setTimestamp] = useState(0);

  const formatTime = time => {
    let min = Math.floor(time / 60);
    min < 1 ? (min = 0) : (min = min.toFixed(0));
    let sec = time % 60;
    return `${min}:${sec < 10 ? 0 : ""}${sec}`;
  };

  return (
    <div
      id="p-box"
      className="player-progress-box"
      onMouseMove={e => {
        let pos = e.nativeEvent.offsetX;
        let width = $("#p-box").width();
        let newPos = (pos / width) * 100;
        let time = (
          ((pos / width) * props.player.playerState.getDuration()) /
          1000
        ).toFixed(0);
        $("#tooltip").offset({ left: e.pageX - $("#tooltip").width() / 2 });
        setTrackPos(newPos);
        setTip("block");
        setTimestamp(formatTime(time));
      }}
      onMouseLeave={() => {
        setTrackPos(0);
        setTip("none");
      }}
      onClick={e => {
        let pos = e.nativeEvent.offsetX;
        let width = $("#p-box").width();
        props.seekPlayer(
          (pos / width) * props.player.playerState.getDuration()
        );
      }}
    >
      <div style={{ display: tip }} id="tooltip" className="player-tooltip">
        {timestamp}
      </div>
      <div
        className="player-progress-hover"
        style={{
          width: trackPos + "%"
        }}
      />
      <div
        className="player-progress"
        style={{
          width: props.player.playerState
            ? (props.player.playerState.currentTime() /
                props.player.playerState.getDuration()) *
                100 +
              "%"
            : 0 + "%"
        }}
      />
    </div>
  );
};

export default PlayerSeekbar;
