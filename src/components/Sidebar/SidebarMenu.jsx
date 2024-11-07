import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AppContext } from "../../providers/Contexts";

const SidebarMenu = ({ onClickMenu = undefined }) => {
  const defaultStyle = "text-gray-400";
  const activeStyle = "text-gray-800";

  const appContext = useContext(AppContext);
  const [selected, setSelected] = useState(appContext.data.projects[0]);

  const setTextStyle = (key) => {
    return key === selected ? activeStyle : defaultStyle;
  };

  return (
    <div className="flex max-w-xs flex-col">
      {appContext.data.projects.map((menu) => {
        return (
          <a
            className={`-mt-px inline-flex items-center gap-x-3.5 px-4 py-3 text-sm ${setTextStyle(menu)}`}
            onClick={(e) => {
              e.preventDefault();
              onClickMenu && onClickMenu(menu);
              setSelected(menu);
            }}
            key={menu}
          >
            <FontAwesomeIcon icon={faList} />
            {menu}
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
