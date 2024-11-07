import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { useState } from "react";

const SidebarMenu = ({ onClickMenu = undefined }) => {
  const defaultStyle = "text-gray-400";
  const activeStyle = "text-gray-800";

  const setTextStyle = (key) => {
    return key === selected ? activeStyle : defaultStyle;
  };

  const menuList = [
    { name: "Project#1", icon: faList },
    { name: "Project#2", icon: faList },
  ];

  const [selected, setSelected] = useState(menuList[0].name);

  return (
    <div className="flex max-w-xs flex-col">
      {menuList.map((menu) => {
        return (
          <a
            className={`-mt-px inline-flex items-center gap-x-3.5 px-4 py-3 text-sm ${setTextStyle(menu.name)}`}
            onClick={(e) => {
              e.preventDefault();
              onClickMenu && onClickMenu(menu.name);
              setSelected(menu.name);
            }}
            key={menu.name}
          >
            <FontAwesomeIcon icon={faList} />
            {menu.name}
          </a>
        );
      })}
    </div>
  );
};

SidebarMenu.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};

export default SidebarMenu;
