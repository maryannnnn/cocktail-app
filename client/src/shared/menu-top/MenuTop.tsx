import './menu-top.scss'
import './media.scss'
import { NavLink } from "react-router-dom";
import React from "react";
import {menuTop} from "../../entities/menu/menuList";


const MenuTop = () => {

  return (
    <ul className="menu">
      {menuTop
        .sort((a, b) => a.order - b.order)
        .map(item =>
          <li className="menu-item" key={item.id}>
            <NavLink
              className="menu-link"
              to={item.url}
            >{item.name}</NavLink>
          </li>
        )}
    </ul>
  )
}

export default MenuTop
