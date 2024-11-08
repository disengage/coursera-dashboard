import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

import SidebarMenu from "./SidebarMenu";

const SidebarView = ({ onClickMenu = undefined }) => {
  return (
    <div className="hidden h-screen flex-none border border-neutral-200 bg-neutral-50 max-sm:p-0 xl:block 2xl:block">
      <div className="hs-accordion-group m-8">
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
            <div className="mx-2 w-full font-semibold">Workspace</div>
            <FontAwesomeIcon
              icon={faChevronUp}
              className="block size-4 hs-accordion-active:hidden"
            />
            <FontAwesomeIcon
              icon={faChevronDown}
              className="hidden size-4 hs-accordion-active:block"
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
    </div>
  );
};

SidebarView.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};

export default SidebarView;
