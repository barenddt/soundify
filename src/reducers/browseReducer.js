import { SEARCH_TRACKS, GET_MORE, REFRESHING } from "./types";
import { store } from "../reducers/store";
import SCv2 from "soundcloud-api-v2";

SC.initialize({
  client_id: "9aB60VZycIERY07OUTVBL5GeErnTA0E4"
});

SCv2.init({
  clientId: "tNdzqSQH10kJuLrRhPLbf5wtQEnaXmi1",
  host: "https://aqueous-lake-30663.herokuapp.com"
});

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
  SCv2.get("search/tracks", {
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

    let urlObj = new URL(store.getState().browse.next_href);
    let pathname = urlObj.pathname.substring(1);
    let params = {};

    urlObj.searchParams.forEach((val, key) => {
      params[key] = val;
    });

    SCv2.get(pathname, params).then(res => {
      dispatch({
        type: GET_MORE,
        payload: {
          tracks: res.collection,
          next_href: res.next_href
        }
      });
      refreshing = false;
    });
  }
};
