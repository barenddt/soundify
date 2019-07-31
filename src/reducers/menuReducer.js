import { CHANGE_MENU } from "./types";
import { history } from "./store";

const initialState = {
  activeMenu: "Browse",
  items: [
    {
      name: "Browse",
      icon: "fas fa-search"
    },
    {
      name: "Trending",
      icon: "fab fa-hotjar"
    },
    {
      name: "Playlists",
      icon: "fas fa-th-list"
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MENU:
      state.activeMenu = action.payload.active;
      return { ...state };
    default:
      return { ...state };
  }
}

export const changeMenu = active => dispatch => {
  dispatch({
    type: CHANGE_MENU,
    payload: {
      active
    }
  });
  history.push(`/${active.toLowerCase()}`);
};
