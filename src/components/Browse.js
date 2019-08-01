import React, { Component } from "react";
import { DebounceInput } from "react-debounce-input";
import { connect } from "react-redux";
import { searchTracks, getMore } from "../reducers/browseReducer";
import { playTrack, playPause } from "../reducers/playerReducer";
import truncate from "truncate";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: null,
      refreshing: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getMore();
    }, 500);
  }

  getMore() {
    $("#cont").on("scroll", () => {
      if (
        $("#cont").scrollTop() + $("#cont").innerHeight() >=
        $("#cont")[0].scrollHeight - 300
      ) {
        if (!this.props.browse.refreshing) {
          this.props.getMore(this.props.browse.next_href);
        }
        this.setState({ refreshing: true });
      }
    });
  }

  makeTracks() {
    let tracks = [];
    let sTracks = this.props.browse.tracks;
    sTracks.forEach(track => {
      tracks.push(
        <div
          onMouseEnter={() => this.setState({ hovering: track.id })}
          onMouseLeave={() => this.setState({ hovering: null })}
          className="row-item"
          onClick={() => {
            if (
              this.props.player.currentlyPlaying &&
              this.props.player.currentlyPlaying.id == track.id
            ) {
              this.props.playPause(this.props.player.isPlaying);
            } else {
              this.props.playTrack(track);
            }
          }}
        >
          <div className="s-back-container" />
          <img
            src={
              track.artwork_url
                ? track.artwork_url.replace("large", "t300x300")
                : "https://i.postimg.cc/ZnG61QfD/default-track.png"
            }
            className="s-back-img"
          />
          <div className="s-title-container">
            <div className="s-back-shade" />
            <div className="s-title">{this.renderBox(track)}</div>
          </div>
        </div>
      );
    });
    return tracks;
  }

  renderBox(track) {
    if (this.state.hovering && this.state.hovering == track.id) {
      if (
        this.props.player.currentlyPlaying &&
        this.props.player.currentlyPlaying.id == track.id
      ) {
        return (
          <div className="s-inline-player s-active">
            <div className="s-inline-title" style={{ padding: "10px" }}>
              {truncate(track.title, 35)}
            </div>
            <i
              class={`s-icon fas fa-${
                this.props.player.isPlaying ? "pause" : "play"
              }-circle`}
            />
            <div className="s-inline-meta" style={{ padding: "10px" }}>
              <div>
                <i class="s-inline-icon fas fa-heart" />
                {this._shorten(track.likes_count)}
              </div>
              <div>
                <i class="s-inline-icon fas fa-redo-alt" />
                {this._shorten(track.reposts_count)}
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
                {this._shorten(track.likes_count)}
              </div>
              <div>
                <i class="s-inline-icon fas fa-redo-alt" />
                {this._shorten(track.reposts_count)}
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (
        this.props.player.currentlyPlaying &&
        this.props.player.currentlyPlaying.id == track.id
      ) {
        return (
          <div className="s-inline-player s-active">
            <div className="s-inline-title" style={{ padding: "10px" }}>
              {truncate(track.title, 35)}
            </div>
            <i
              class={`s-icon fas fa-${
                this.props.player.isPlaying ? "pause" : "play"
              }-circle`}
            />
            <div className="s-inline-meta" style={{ padding: "10px" }}>
              <div>
                <i class="s-inline-icon fas fa-heart" />
                {this._shorten(track.likes_count)}
              </div>
              <div>
                <i class="s-inline-icon fas fa-redo-alt" />
                {this._shorten(track.reposts_count)}
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
  }

  _shorten(num) {
    let newNum;
    if (num > 1000000) {
      newNum = (Math.ceil(num) / 1000000).toFixed(1) + "m";
    } else if (num > 1000) {
      newNum = (Math.ceil(num) / 1000).toFixed(1) + "k";
    } else {
      newNum = num;
    }
    return newNum;
  }

  render() {
    return (
      <div id="cont" className="container">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={e => this.props.searchTracks(e.target.value)}
          autoFocus
          className="search-bar"
          placeholder="Search for music..."
        />
        <div className="row">{this.makeTracks()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player,
  browse: state.browse
});

const mapDispatchToProps = dispatch => ({
  searchTracks: e => dispatch(searchTracks(e)),
  playTrack: e => dispatch(playTrack(e)),
  getMore: e => dispatch(getMore(e)),
  playPause: e => dispatch(playPause(e))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
