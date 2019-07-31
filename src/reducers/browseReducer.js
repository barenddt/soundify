import { SEARCH_TRACKS, GET_MORE, REFRESHING } from "./types";
import Axios from "axios";

const initialState = {
  tracks: [],
  q: null,
  next_href: null,
  refreshing: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TRACKS:
      state.tracks = action.payload.tracks;
      state.q = action.payload.q;
      state.next_href = action.payload.next_href;
      return { ...state };
    case GET_MORE:
      for (let i = 0; i < action.payload.tracks.length; i++) {
        state.tracks.push(action.payload.tracks[i]);
      }
      state.next_href = action.payload.next_href;
      state.refreshing = false;
      return { ...state };
    case REFRESHING:
      state.refreshing = action.payload.refreshing;
      return { ...state };
    default:
      return { ...state };
  }
}

export const searchTracks = e => dispatch => {
  dispatch({
    type: SEARCH_TRACKS,
    payload: {
      tracks: []
    }
  });
  SC.get("/tracks", {
    q: e,
    limit: 45,
    linked_partitioning: 1
  }).then(tracks => {
    dispatch({
      type: SEARCH_TRACKS,
      payload: {
        tracks: tracks.collection,
        q: e,
        next_href: tracks.next_href
      }
    });
  });
};

export const getMore = e => dispatch => {
  dispatch({
    type: REFRESHING,
    payload: {
      refreshing: true
    }
  });
  Axios.get(e).then(res => {
    dispatch({
      type: GET_MORE,
      payload: {
        tracks: res.data.collection,
        next_href: res.data.next_href
      }
    });
  });
};
