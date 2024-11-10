import { useContext } from "react";
import { AppContext } from "../../providers/Contexts";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const SidebarMenuSM = ({ onClickMenu = undefined }) => {
  const appContext = useContext(AppContext);

  return (
    <div className="flex flex-col">
      {appContext.data?.data?.projects?.map((menu) => {
        return (
          <a
            className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
            onClick={(e) => {
              e.preventDefault();
              onClickMenu && onClickMenu(menu);
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

SidebarMenuSM.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};

export default SidebarMenuSM;
