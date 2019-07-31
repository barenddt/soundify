import React, { Component } from "react";
import { connect } from "react-redux";
import { changeMenu } from "../reducers/menuReducer";
import Media from "react-media";

export class SideMenu extends Component {
  makeMenu() {
    let menu = [];
    let mItems = this.props.menu.items;

    mItems.forEach(item => {
      menu.push(
        <li
          key={item.name}
          onClick={() => this.props.changeMenu(item.name)}
          className={this.props.menu.activeMenu == item.name ? "active" : null}
        >
          <i class={`icon ${item.icon}`} />
          <Media query="(max-width: 810px)">
            {matches => (matches ? null : item.name)}
          </Media>
        </li>
      );
    });

    return menu;
  }

  render() {
    return (
      <div className="sidemenu shadow-dark">
        <ul>{this.makeMenu()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.menu
});

const mapDispatchToProps = dispatch => ({
  changeMenu: active => dispatch(changeMenu(active))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
