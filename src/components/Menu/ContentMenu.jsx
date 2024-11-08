import { useContext, useMemo } from "react";
import { AppContext } from "../../providers/Contexts";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";

const ContentMenu = ({ onClickMenu = undefined }) => {
  const menuNamed = useMemo(
    () => [
      { name: "TaskBoardView", display: "Board", icon: faChartSimple },
      { name: "TaskListView", display: "List", icon: faBarsStaggered },
    ],
    [],
  );

  const appContext = useContext(AppContext);

  const defaultStyle = "text-gray-400 border-b";
  const activeStyle = "text-gray-800 border-b-2 border-neutral-500";

  const setTextStyle = (key) => {
    return key === appContext.selectedContentView ? activeStyle : defaultStyle;
  };

  return (
    <div className="mb-4 border-b-2 border-gray-200">
      <nav className="-mb-0.5 flex">
        {menuNamed.map((menu) => {
          return (
            <a
              className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-4 text-sm font-medium ${setTextStyle(menu.name)}`}
              onClick={(e) => {
                e.preventDefault();
                onClickMenu && onClickMenu(menu.name);
                appContext.setContentViewType(menu.name);
              }}
              key={menu.name}
            >
              <FontAwesomeIcon icon={menu.icon} className="size-4 shrink-0" />
              {menu.display}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

ContentMenu.propTypes = {
  onClickMenu: PropTypes.func,
};

export default ContentMenu;
