import { SEARCH_TRACKS, GET_MORE, REFRESHING } from "./types";
import Axios from "axios";
import SCv2 from "soundcloud-api-v2";
import { store } from "../reducers/store";

SCv2.init("tNdzqSQH10kJuLrRhPLbf5wtQEnaXmi1");

const initialState = {
  tracks: [],
  q: null,
  next_href: null
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
      return { ...state };
    case REFRESHING:
      state.refreshing = action.payload.refreshing;
      return { ...state };
    default:
      return { ...state };
  }
}

export const searchTracks = e => dispatch => {
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

let refreshing = false;

export const getMore = () => dispatch => {
  if (!refreshing) {
    refreshing = true;
    Axios.get(store.getState().browse.next_href).then(res => {
      dispatch({
        type: GET_MORE,
        payload: {
          tracks: res.data.collection,
          next_href: res.data.next_href
        }
      });
      refreshing = false;
    });
  }
};
