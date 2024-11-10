import PropTypes from "prop-types";
import SidebarMenuSM from "./SidebarMenu-sm";
import { useContext } from "react";
import { AppContext } from "../../providers/Contexts";

const SidebarViewSM = ({ onClickMenu }) => {
  const appContext = useContext(AppContext);

  return (
    <div className="mt-4 hidden w-full px-8 xs:block sm:block md:block lg:block">
      <div className="flex items-center justify-center">
        <div className="grow">Workspace</div>
        <div className="flex-none">
          <div className="hs-dropdown relative z-[1] inline-flex">
            <button
              id="hs-dropdown-default"
              type="button"
              className="hs-dropdown-toggle inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              {appContext.data?.selectedProject}
              <svg
                className="size-4 hs-dropdown-open:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <div
              className="hs-dropdown-menu duration mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] before:absolute before:-top-4 before:start-0 before:h-4 before:w-full after:absolute after:-bottom-4 after:start-0 after:h-4 after:w-full hs-dropdown-open:opacity-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-default"
            >
              <div className="z-auto space-y-0.5 p-1">
                <SidebarMenuSM onClickMenu={onClickMenu} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SidebarViewSM.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};

export default SidebarViewSM;
