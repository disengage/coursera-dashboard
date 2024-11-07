import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleDot,
  faCircle,
  faCaretRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import TaskTableView from "./TaskTableView";
import PropTypes from "prop-types";

const TaskListView = ({ visibility = true }) => {
  const visibile = visibility ? "" : "hidden";

  return (
    <div className={`${visibile} hs-accordion-group`}>
      <div
        className="hs-accordion mt-px-8 border first:rounded-t-lg last:rounded-b-lg"
        id="hs-bordered-heading-one"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500"
          aria-expanded="false"
          aria-controls="hs-basic-bordered-collapse-one"
        >
          <FontAwesomeIcon
            icon={faCaretRight}
            className="hs-accordion-active:hidden block size-4"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            className="hs-accordion-active:block hidden size-4"
          />
          <div>
            <span className="inline-flex items-center gap-x-1 rounded-full bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="size-4 shrink-0"
              />
              COMPLETE
            </span>
          </div>
        </button>
        <div
          id="hs-basic-bordered-collapse-one"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-bordered-heading-one"
        >
          <TaskTableView />
        </div>
      </div>

      <div
        className="hs-accordion -mt-px border bg-white first:rounded-t-lg last:rounded-b-lg"
        id="hs-bordered-heading-two"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500"
          aria-expanded="false"
          aria-controls="hs-basic-bordered-collapse-two"
        >
          <FontAwesomeIcon
            icon={faCaretRight}
            className="hs-accordion-active:hidden block size-4"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            className="hs-accordion-active:block hidden size-4"
          />
          <div>
            <span className="inline-flex items-center gap-x-1 rounded-full bg-blue-100 px-1.5 py-1 text-xs font-medium text-blue-800">
              <FontAwesomeIcon icon={faCircleDot} className="size-4 shrink-0" />
              IN PROGRESS
            </span>
          </div>
        </button>
        <div
          id="hs-basic-bordered-collapse-two"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-bordered-heading-two"
        >
          <div className="px-5 pb-4">
            <p className="text-gray-800 dark:text-neutral-200">
              <em>This is the second item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>
      </div>

      <div
        className="hs-accordion -mt-px border bg-white first:rounded-t-lg last:rounded-b-lg"
        id="hs-bordered-heading-three"
      >
        <button
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 dark:hs-accordion-active:text-blue-500 inline-flex w-full items-center gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500"
          aria-expanded="false"
          aria-controls="hs-basic-bordered-collapse-three"
        >
          <FontAwesomeIcon
            icon={faCaretRight}
            className="hs-accordion-active:hidden block size-4"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            className="hs-accordion-active:block hidden size-4"
          />
          <div>
            <span className="inline-flex items-center gap-x-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
              <FontAwesomeIcon icon={faCircle} className="size-4 shrink-0" />
              TO DO
            </span>
          </div>
        </button>
        <div
          id="hs-basic-bordered-collapse-three"
          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
          role="region"
          aria-labelledby="hs-bordered-heading-three"
        >
          <div className="px-5 pb-4">
            <p className="text-gray-800 dark:text-neutral-200">
              <em>This is the first item's accordion body.</em> It is hidden by
              default, until the collapse plugin adds the appropriate classes
              that we use to style each element. These classes control the
              overall appearance, as well as the showing and hiding via CSS
              transitions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskListView.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default TaskListView;
