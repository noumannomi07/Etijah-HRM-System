import { faChevronDown, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import React from "react";

const ActionData = ({ menuItems, isChevronDown = false }) => {
  return (
    <Menu className="drop-menu-actions">
      <MenuHandler>
        <div className={`button-transparent `}>
          {isChevronDown ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faEllipsisV} />
          )}
        </div>
      </MenuHandler>
      <MenuList className="menu-list-drop-content p-0  !translate-x-[23px]">
        {menuItems.map((item, index) => (
          <MenuItem className="p-0" key={index}>
            <div
              className="p-3 border-b transition-all duration-500 hover:bg-gray-100 cursor-pointer item-center-flex gap-2"
              onClick={item.disabled ? undefined : item.onClick}
            >
              <div className="icon-info">{item.icon}</div>
              <h2
                className={`${
                  item.disabled ? "text-gray-400" : "text-font-dark"
                } ${item.textClass} text-[16px]`}
              >
                {item.label}
              </h2>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
ActionData.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      textClass: PropTypes.string
    })
  ).isRequired
};

export default ActionData;
