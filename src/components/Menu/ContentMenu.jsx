import { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../providers/Contexts";

const ContentMenu = ({ onClickMenu = undefined }) => {
  const menuNamed = useMemo(
    () => [
      { name: "TaskBoardView", display: "Board", icon: faChartSimple },
      { name: "TaskListView", display: "List", icon: faBarsStaggered },
    ],
    [],
  );

  const appContext = useContext(AppContext);

  const [current, setCurrent] = useState(appContext.selectedProject);
  const [selected, setSelected] = useState(menuNamed[0].name);

  const defaultStyle = "text-gray-400 border-b";
  const activeStyle = "text-gray-800 border-b-2 border-neutral-500";

  useEffect(() => {
    // If the user changes project name from sidebar menu
    // then reset main content tab to first tab
    if (current !== appContext.selectedProject) {
      setCurrent(appContext.selectedProject);
      setSelected(menuNamed[0].name);
    }
  }, [appContext, current, menuNamed]);

  const setTextStyle = (key) => {
    return key === selected ? activeStyle : defaultStyle;
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
                setSelected(menu.name);
                appContext.selectedProject = menu.name;
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
