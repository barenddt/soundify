import React, { Component } from "react";
import ReactSlider from "react-slider";
import KeyboardEventHandler from "react-keyboard-event-handler";
import PlayerButtonsContainer from "../containers/PlayerButtonsContainer";
import PlayerSeekBarContainer from "../containers/PlayerSeekBarContainer";
import PlayerInfo from "../components/PlayerInfo";

export class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSeeking: false,
      value: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.player.playNext) {
        let tracks = this.props.browse.tracks;
        let next;
        if (this.props.player.repeat) {
          this.props.playTrack(this.props.player.currentlyPlaying);
        } else {
          if (!this.props.player.shuffle) {
            next = tracks.indexOf(this.props.player.currentlyPlaying) + 1;
            this.props.playTrack(tracks[next]);
          } else {
            next = tracks[Math.floor(Math.random() * tracks.length)];
            this.props.playTrack(next);
          }
        }
      }
    }, 1000);
    navigator.mediaSession.setActionHandler("play", () =>
      this.props.playPause()
    );
    navigator.mediaSession.setActionHandler("pause", () =>
      this.props.playPause()
    );
    navigator.mediaSession.setActionHandler("previoustrack", () =>
      this.props.seekPlayer(0)
    );
    navigator.mediaSession.setActionHandler("nexttrack", () => {
      let tracks = this.props.browse.tracks;
      let next = tracks.indexOf(this.props.player.currentlyPlaying) + 1;
      this.props.playTrack(this.props.browse.tracks[next]);
    });

    if ($(window).width() < 810) {
      this.props.adjustVolume(100);
    }
  }

  render() {
    let playerClass = this.props.player.playerState
      ? "player shadow-light"
      : "player shadow-light p-hide";

    return (
      <div className={playerClass}>
        <PlayerSeekBarContainer />

        <div className="player-box">
          {this.props.player.currentlyPlaying ? (
            <PlayerInfo player={this.props.player} />
          ) : null}
          <PlayerButtonsContainer />
          <div className="player-item-volume">
            <div onClick={() => this.props.adjustVolume(0)}>
              {this.makeVolIcon()}
            </div>
            <ReactSlider
              className="v-slider"
              min={0}
              max={100}
              defaultValue={0}
              value={this.props.player.volume}
              onChange={e => this.props.adjustVolume(e)}
            >
              <div className="p-thumb" />
            </ReactSlider>
          </div>
          <KeyboardEventHandler
            handleKeys={["space", "left", "right", "m"]}
            onKeyEvent={key => this.handleKeyEvent(key)}
          />
        </div>
      </div>
    );
  }

  handleKeyEvent(key) {
    switch (key) {
      case "space":
        this.props.playPause(this.props.player.isPlaying);
        break;
      case "right":
        if (this.props.player.volume != 100) {
          if (this.props.player.volume + 5 > 100) {
            this.props.adjustVolume(100);
          } else {
            this.props.adjustVolume(this.props.player.volume + 5);
          }
        }
        break;
      case "left":
        if (this.props.player.volume != 0) {
          if (this.props.player.volume - 5 < 0) {
            this.props.adjustVolume(0);
          } else {
            this.props.adjustVolume(this.props.player.volume - 5);
          }
        }
        break;
      case "m":
        this.props.adjustVolume(0);
        break;
    }
  }

  makeVolIcon() {
    let volume = this.props.player.volume;
    if (volume >= 66) {
      return <i class="v-icon fas fa-volume-up" />;
    }
    if (volume < 66 && volume >= 33) {
      return <i class="v-icon fas fa-volume-down" />;
    }
    if (volume < 33 && volume >= 1) {
      return <i class="v-icon fas fa-volume-off" />;
    }
    if (volume == 0) {
      return <i class="v-icon fas fa-volume-mute" />;
    }
  }
}

export default Player;
