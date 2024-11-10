import { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const SidebarMenu = ({ onClickMenu = undefined, menu }) => {
  const defaultStyle = "text-gray-400";
  const activeStyle = "text-gray-800";

  const [selected, setSelected] = useState(menu[0]);

  const setTextStyle = (key) => {
    return key === selected ? activeStyle : defaultStyle;
  };

  return (
    <div className="flex flex-col">
      {menu.map((item) => {
        return (
          <a
            className={`-mt-px inline-flex items-center gap-x-3.5 px-4 py-3 text-sm ${setTextStyle(item)}`}
            onClick={(e) => {
              e.preventDefault();
              onClickMenu && onClickMenu(item);
              setSelected(item);
            }}
            key={item}
          >
            <FontAwesomeIcon icon={faList} />
            {item}
          </a>
        );
      })}
    </div>
  );
};

SidebarMenu.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
  menu: PropTypes.array,
};

export default SidebarMenu;
