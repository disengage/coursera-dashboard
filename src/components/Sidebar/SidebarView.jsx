import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

import SidebarMenu from "./SidebarMenu";
import PropTypes from "prop-types";

const SidebarView = ({ onClickMenu = undefined }) => {
  return (
    <div className="hs-accordion-group">
      <div
        className="hs-accordion active"
        id="hs-basic-with-title-and-arrow-stretched-heading-one"
      >
        <button
          className="hs-accordion-toggle inline-flex w-full items-center justify-between rounded-lg py-3 text-start"
          aria-expanded="true"
          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
        >
          <FontAwesomeIcon icon={faFolderOpen} />
          <div className="ml-2 w-full font-semibold">Workspace</div>
          <FontAwesomeIcon
            icon={faChevronUp}
            className="hs-accordion-active:hidden block size-4"
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            className="hs-accordion-active:block hidden size-4"
          />
        </button>
        <div
          id="hs-basic-with-title-and-arrow-stretched-collapse-one"
          className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
        >
          <SidebarMenu onClickMenu={onClickMenu} />
        </div>
      </div>
    </div>
  );
};

SidebarView.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};

export default SidebarView;
