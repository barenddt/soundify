import React from "react";

export const SideMenu = props => {
  const makeMenu = () => {
    let menu = [];
    let mItems = props.menu.items;

    mItems.forEach(item => {
      menu.push(
        <li
          key={item.name}
          onClick={() => props.changeMenu(item.name)}
          className={props.menu.activeMenu == item.name ? "active" : null}
        >
          <i class={`icon ${item.icon}`} />
          <span className="sm-menu-item-text">{item.name}</span>
        </li>
      );
    });

    return menu;
  };

  return (
    <div className="sidemenu shadow-dark">
      <div className="logo-box">
        <i className="logo fas fa-music" />
        <span className="logo-box-text">Soundify</span>
      </div>

      <ul>{makeMenu()}</ul>
    </div>
  );
};

export default SideMenu;
