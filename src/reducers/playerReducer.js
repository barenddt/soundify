import {
  CHANGE_STATE,
  UPDATE_PLAYER,
  ADJUST_VOLUME,
  CHANGE_CURRENT,
  PLAY_PAUSE
} from "./types";
import { store } from "../reducers/store";

let musicPlayer;

const initialState = {
  isPlaying: false,
  playerState: null,
  currentlyPlaying: null,
  playNext: false,
  volume: localStorage.getItem("sc-vol") ? localStorage.getItem("sc-vol") : 50
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_STATE:
      state.isPlaying = action.payload.isPlaying;
      state.playNext = action.payload.playNext;
      return { ...state };
    case UPDATE_PLAYER:
      state.playerState = action.payload.playerState;
      return { ...state };
    case CHANGE_CURRENT:
      state.currentlyPlaying = action.payload.currentlyPlaying;
      return { ...state };
    case ADJUST_VOLUME:
      state.volume = action.payload.volume;
      return { ...state };
    case PLAY_PAUSE:
      state.isPlaying = !state.isPlaying;
      return { ...state };
    default:
      return { ...state };
  }
}

export const playTrack = track => dispatch => {
  console.log(track);
  dispatch({
    type: CHANGE_STATE,
    payload: {
      isPlaying: false,
      playNext: false
    }
  });
  if (
    musicPlayer == null ||
    track.id != store.getState().player.currentlyPlaying.id
  ) {
    SC.stream(`/tracks/${track.id}`).then(stream => {
      musicPlayer = stream;
      musicPlayer.play();
      musicPlayer.setVolume(store.getState().player.volume / 100);
      setMediaMeta(track);
      dispatch({
        type: CHANGE_CURRENT,
        payload: {
          currentlyPlaying: track
        }
      });
    });
  }
  dispatch({
    type: CHANGE_STATE,
    payload: {
      isPlaying: true,
      playNext: false
    }
  });

  const ticker = setInterval(() => {
    if (musicPlayer && musicPlayer.isPlaying()) {
      dispatch({
        type: UPDATE_PLAYER,
        payload: {
          playerState: musicPlayer
        }
      });
    }
    if (musicPlayer && musicPlayer.isEnded()) {
      clearInterval(ticker);
      dispatch({
        type: CHANGE_STATE,
        payload: {
          isPlaying: false,
          playNext: true
        }
      });
    }
  }, 500);
};

const setMediaMeta = track => {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.user.username,
    artwork: [
      {
        src: track.artwork_url.replace("large", "t300x300"),
        sizes: "300x300",
        type: "image/png"
      }
    ]
  });
};

export const playPause = state => dispatch => {
  if (state) {
    musicPlayer.pause();
  } else {
    musicPlayer.play();
  }
  dispatch({
    type: PLAY_PAUSE
  });
};

export const seekPlayer = to => dispatch => {
  if (musicPlayer && musicPlayer.isActuallyPlaying()) {
    musicPlayer.seek(to);
  } else {
    musicPlayer.seek(to);
    musicPlayer.play();
    dispatch({
      type: CHANGE_STATE,
      payload: {
        isPlaying: true
      }
    });
  }
};

export const adjustVolume = to => dispatch => {
  localStorage.setItem("sc-vol", to);
  if (musicPlayer) {
    musicPlayer.setVolume(to / 100);
  }
  dispatch({
    type: ADJUST_VOLUME,
    payload: {
      volume: to
    }
  });
};
