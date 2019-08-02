import React, { useEffect } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import PlayerButtonsContainer from "../containers/PlayerButtonsContainer";
import PlayerSeekBarContainer from "../containers/PlayerSeekBarContainer";
import PlayerVolumeContainer from "../containers/PlayerVolumeContainer";
import PlayerInfo from "../components/PlayerInfo";

const Player = props => {
  const handleKeyEvent = key => {
    switch (key) {
      case "space":
        props.playPause(props.player.isPlaying);
        break;
      case "right":
        if (props.player.volume != 100) {
          if (props.player.volume + 5 > 100) {
            props.adjustVolume(100);
          } else {
            props.adjustVolume(props.player.volume + 5);
          }
        }
        break;
      case "left":
        if (props.player.volume != 0) {
          if (props.player.volume - 5 < 0) {
            props.adjustVolume(0);
          } else {
            props.adjustVolume(props.player.volume - 5);
          }
        }
        break;
      case "m":
        props.adjustVolume(0);
        break;
    }
  };

  useEffect(() => {
    setInterval(() => {
      if (props.playNext) {
        let tracks = props.tracks;
        let next;
        if (props.repeat) {
          props.playTrack(props.currentlyPlaying);
        } else {
          if (!props.player.shuffle) {
            next = tracks.indexOf(props.currentlyPlaying) + 1;
            props.playTrack(tracks[next]);
          } else {
            next = tracks[Math.floor(Math.random() * tracks.length)];
            props.playTrack(next);
          }
        }
      }
    }, 1000);
    navigator.mediaSession.setActionHandler("play", () => props.playPause());
    navigator.mediaSession.setActionHandler("pause", () => props.playPause());
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      props.seekPlayer(0)
    );
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      let tracks = props.tracks;
      let next = tracks.indexOf(props.currentlyPlaying) + 1;
      props.playTrack(props.tracks[next]);
    });
  });

  let playerClass = props.currentlyPlaying
    ? "player shadow-light"
    : "player player-hide shadow-light";

  return (
    <div className={playerClass}>
      <PlayerSeekBarContainer />
      <div className="player-box">
        {props.currentlyPlaying ? (
          <PlayerInfo currentlyPlaying={props.currentlyPlaying} />
        ) : null}
        <PlayerButtonsContainer />
        <PlayerVolumeContainer />
        <KeyboardEventHandler
          handleKeys={["space", "left", "right", "m"]}
          onKeyEvent={key => handleKeyEvent(key)}
        />
      </div>
    </div>
  );
};

export default Player;
