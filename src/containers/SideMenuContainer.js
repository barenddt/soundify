import { connect } from "react-redux";
import SideMenu from "../components/SideMenu";
import { changeMenu } from "../reducers/menuReducer";

const sideMenuContainer = connect(
  state => ({
    menu: state.menu
  }),
  {
    changeMenu
  }
)(SideMenu);

export default sideMenuContainer;
