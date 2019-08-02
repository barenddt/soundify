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
          <i class={`sm-icon ${item.icon}`} />
          <span className="sm-menu-text">{item.name}</span>
        </li>
      );
    });

    return menu;
  };

  return (
    <div className="sm-container shadow-dark">
      <div className="sm-logo-container">
        <i className="sm-logo fas fa-music" />
        <span className="sm-logo-text">Soundify</span>
      </div>

      <ul>{makeMenu()}</ul>
    </div>
  );
};

export default SideMenu;
