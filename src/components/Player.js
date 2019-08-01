import React, { Component } from "react";
import { connect } from "react-redux";
import {
  playPause,
  seekPlayer,
  adjustVolume,
  playTrack
} from "../reducers/playerReducer";
import ReactSlider from "react-slider";
import KeyboardEventHandler from "react-keyboard-event-handler";

export class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSeeking: false,
      value: 0,
      trackPos: 0,
      tip: "none",
      timestamp: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      if (this.props.player.playNext) {
        let tracks = this.props.browse.tracks;
        let next = tracks.indexOf(this.props.player.currentlyPlaying) + 1;
        this.props.playTrack(this.props.browse.tracks[next]);
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

  seekDone = e => {
    this.props.seekPlayer(e);
    this.setState({ isSeeking: false });
  };

  playNext() {
    let tracks = this.props.browse.tracks;
    let next = tracks.indexOf(this.props.player.currentlyPlaying) + 1;
    this.props.playTrack(this.props.browse.tracks[next]);
  }

  render() {
    let playerClass = this.props.player.playerState
      ? "player shadow-light"
      : "player shadow-light p-hide";

    return (
      <div className={playerClass}>
        <div
          id="p-box"
          className="player-progress-box"
          onMouseMove={e => {
            let pos = e.nativeEvent.offsetX;
            let width = $("#p-box").width();
            let newPos = (pos / width) * 100;
            let time = (
              ((pos / width) * this.props.player.playerState.getDuration()) /
              1000
            ).toFixed(0);
            $("#tooltip").offset({ left: e.pageX - $("#tooltip").width() / 2 });
            this.setState({
              trackPos: newPos,
              tip: "block",
              timestamp: this.makeTime(time)
            });
          }}
          onMouseLeave={e => {
            this.setState({ trackPos: 0, tip: "none" });
          }}
          onClick={e => {
            let pos = e.nativeEvent.offsetX;
            let width = $("#p-box").width();
            this.props.seekPlayer(
              (pos / width) * this.props.player.playerState.getDuration()
            );
          }}
        >
          <div
            style={{ display: this.state.tip }}
            id="tooltip"
            className="player-tooltip"
          >
            {this.state.timestamp}
          </div>
          <div
            className="player-progress-hover"
            style={{
              width: this.state.trackPos + "%"
            }}
          />
          <div
            className="player-progress"
            style={{
              width: this.props.player.playerState
                ? (this.props.player.playerState.currentTime() /
                    this.props.player.playerState.getDuration()) *
                    100 +
                  "%"
                : 0 + "%"
            }}
          />
        </div>

        <div className="player-box">
          {this.props.player.currentlyPlaying ? (
            <div className="player-item-info">
              <img
                className="artwork"
                src={
                  this.props.player.currentlyPlaying.artwork_url
                    ? this.props.player.currentlyPlaying.artwork_url
                    : "https://i.postimg.cc/ZnG61QfD/default-track.png"
                }
              />
              <div className="meta-data">
                {this.props.player.currentlyPlaying.title}
                <small className="artist">
                  {this.props.player.currentlyPlaying.user.username.toUpperCase()}
                </small>
              </div>
            </div>
          ) : null}

          <div className="player-item-buttons">
            <i class="p-icon-xs fas fa-redo-alt" />
            <i
              onClick={() => this.props.seekPlayer(0)}
              className="p-icon-sm fas fa-step-backward"
            />
            <i
              onClick={() => this.props.playPause(this.props.player.isPlaying)}
              className={`p-icon ${
                this.props.player.isPlaying
                  ? "fas fa-pause-circle"
                  : "fas fa-play-circle"
              }`}
            />
            <i
              onClick={() => this.playNext()}
              className="p-icon-sm fas fa-step-forward"
            />
            <i class="p-icon-xs fas fa-random" />
          </div>
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

  makeTime(time) {
    let min = Math.floor(time / 60);
    min < 1 ? (min = 0) : (min = min.toFixed(0));
    let sec = time % 60;
    return `${min}:${sec < 10 ? 0 : ""}${sec}`;
  }
}

const mapStateToProps = state => ({
  player: state.player,
  browse: state.browse
});

const mapDispatchToProps = dispatch => ({
  playPause: e => dispatch(playPause(e)),
  playTrack: e => dispatch(playTrack(e)),
  seekPlayer: to => dispatch(seekPlayer(to)),
  adjustVolume: to => dispatch(adjustVolume(to))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
