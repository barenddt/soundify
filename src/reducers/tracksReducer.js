import { SEARCH_TRACKS, GET_MORE, REFRESHING, GET_TRENDING } from "./types";
import { store } from "./store";
import SCv2 from "soundcloud-v2-api";

SCv2.init({
  clientId: "tNdzqSQH10kJuLrRhPLbf5wtQEnaXmi1",
  cors: true
});

const initialState = {
  search: [],
  trending: [],
  q: null,
  search_href: null,
  trending_href: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TRACKS:
      state.search = action.payload.search;
      state.q = action.payload.q;
      state.search_href = action.payload.search_href;
      return { ...state };
    case GET_TRENDING:
      state.trending = action.payload.trending;
      state.trending_href = action.payload.trending_href;
      return { ...state };
    case GET_MORE:
      for (let i = 0; i < action.payload.search.length; i++) {
        state.search.push(action.payload.search[i]);
      }
      state.search_href = action.payload.search_href;
      return { ...state };
    case REFRESHING:
      state.refreshing = action.payload.refreshing;
      return { ...state };
    default:
      return { ...state };
  }
}

export const searchTracks = e => dispatch => {
  SCv2.get("/search/tracks", {
    q: e,
    limit: 45,
    linked_partitioning: 1
  }).then(search => {
    dispatch({
      type: SEARCH_TRACKS,
      payload: {
        search: search.collection,
        q: e,
        search_href: search.next_href
      }
    });
  });
};

export const getTrending = params => dispatch => {
  SCv2.get("/charts", params).then(trending => {
    let tracks = [];
    trending.collection.forEach(item => {
      tracks.push(item.track);
    });
    dispatch({
      type: GET_TRENDING,
      payload: {
        trending: tracks,
        trending_href: trending.next_href
      }
    });
  });
};

let refreshing = false;

export const getMore = () => dispatch => {
  if (!refreshing) {
    refreshing = true;

    let urlObj = new URL(store.getState().tracks.search_href);
    let pathname = urlObj.pathname.substring(1);
    let params = {};

    urlObj.searchParams.forEach((val, key) => {
      params[key] = val;
    });

    SCv2.get("/" + pathname, params).then(res => {
      dispatch({
        type: GET_MORE,
        payload: {
          search: res.collection,
          search_href: res.next_href
        }
      });
      refreshing = false;
    });
  }
};
