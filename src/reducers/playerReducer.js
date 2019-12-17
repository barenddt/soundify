import {
  CHANGE_STATE,
  UPDATE_PLAYER,
  ADJUST_VOLUME,
  CHANGE_CURRENT,
  PLAY_PAUSE,
  TOGGLE
} from "./types";
import { store } from "../reducers/store";
import SCv2 from "../SC";

SCv2.init({
  clientId: "RUQWGyj6q6sKdsel5JpFoJUvjHmSbPe5",
  cors: true
});

let musicPlayer;
let keepTicking = true;

const initialState = {
  isPlaying: false,
  playerState: null,
  currentlyPlaying: null,
  volume: localStorage.getItem("sc-vol") ? localStorage.getItem("sc-vol") : 50,
  repeat:
    localStorage.getItem("sc-repeat") == "true"
      ? localStorage.getItem("sc-repeat")
      : false,
  shuffle:
    localStorage.getItem("sc-shuffle") == "true"
      ? localStorage.getItem("sc-shuffle")
      : false
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
    case TOGGLE:
      state[action.payload.name] = !state[action.payload.name];
      return { ...state };
    default:
      return { ...state };
  }
}

export const playTrack = (track) => (dispatch) => {
  if (
    !musicPlayer ||
    track.id != store.getState().player.currentlyPlaying.id ||
    store.getState().player.repeat
  ) {
    console.log(track);
    dispatch({
      type: CHANGE_CURRENT,
      payload: {
        currentlyPlaying: track
      }
    });

    SCv2.stream(`${track.media.transcodings[0].url}`, {}).then((stream) => {
      musicPlayer ? musicPlayer.pause() : null;
      musicPlayer = stream;
      musicPlayer.play();
      musicPlayer.setVolume(store.getState().player.volume / 100);
      setMediaMeta(track);
      dispatch({
        type: CHANGE_STATE,
        payload: {
          isPlaying: true,
          playNext: false
        }
      });
      keepTicking = true;

      const tick = setInterval(() => {
        if (store.getState().player.currentlyPlaying.id != track.id) {
          clearInterval(tick);
        }
        if (keepTicking) {
          if (musicPlayer && musicPlayer.isPlaying()) {
            dispatch({
              type: UPDATE_PLAYER,
              payload: {
                playerState: musicPlayer
              }
            });
          }
          if (musicPlayer && musicPlayer.isEnded()) {
            clearInterval(tick);
            keepTicking = false;
            let tracks = store.getState().tracks.search;
            let next;
            if (store.getState().player.repeat) {
              dispatch(playTrack(store.getState().player.currentlyPlaying));
            } else {
              if (!store.getState().player.shuffle) {
                next =
                  tracks.indexOf(store.getState().player.currentlyPlaying) + 1;
                dispatch(playTrack(tracks[next]));
              } else {
                next = tracks[Math.floor(Math.random() * tracks.length)];
                dispatch(playTrack(next));
              }
            }
          }
        }
      }, 100);
    });
  }
};

export const playNext = () => (dispatch) => {
  let tracks = store.getState().tracks.search;
  let next;
  if (!store.getState().player.shuffle) {
    next = tracks.indexOf(store.getState().player.currentlyPlaying) + 1;
    dispatch(playTrack(tracks[next]));
  } else {
    next = tracks[Math.floor(Math.random() * tracks.length)];
    dispatch(playTrack(next));
  }
};

const setMediaMeta = (track) => {
  document.title = `${track.title} - Soundify`;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: track.title,
    artist: track.user.username,
    artwork: [
      {
        src: track.artwork_url
          ? track.artwork_url.replace("large", "t300x300")
          : "https://i.postimg.cc/ZnG61QfD/default-track.png",
        sizes: "300x300",
        type: "image/png"
      }
    ]
  });
};

export const playPause = (state) => (dispatch) => {
  if (state) {
    musicPlayer.pause();
  } else {
    musicPlayer.play();
  }
  dispatch({
    type: PLAY_PAUSE
  });
};

export const seekPlayer = (to) => (dispatch) => {
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

export const adjustVolume = (to) => (dispatch) => {
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

export const toggle = (name) => (dispatch) => {
  localStorage.setItem(`sc-${name}`, !store.getState().player[name]);
  dispatch({
    type: TOGGLE,
    payload: {
      name
    }
  });
};
