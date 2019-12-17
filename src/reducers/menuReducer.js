import { CHANGE_MENU } from "./types";
import { history, store } from "./store";

const initialState = {
  activeMenu: "Trending",
  items: [
    {
      name: "Search",
      icon: "fas fa-search"
    },
    {
      name: "Trending",
      icon: "fab fa-hotjar"
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

export const changeMenu = (active) => (dispatch) => {
  dispatch({
    type: CHANGE_MENU,
    payload: {
      active
    }
  });
  history.push(`/${active.toLowerCase()}`);
};
