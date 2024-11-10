import { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../providers/Contexts";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleDot,
  faCircle,
  faCaretRight,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

import TaskTableView from "./TaskTableView";

const TaskListView = ({ visibility = true }) => {
  const appContext = useContext(AppContext);

  const visibile = visibility ? "" : "hidden";

  const statusList = [
    {
      name: "COMPLETE",
      icon: faCircleCheck,
      bgColor: "bg-teal-100",
      txtColor: "text-teal-800",
      status: "complete",
    },
    {
      name: "IN PROGRESS",
      icon: faCircleDot,
      bgColor: "bg-blue-100",
      txtColor: "text-blue-800",
      status: "inprogress",
    },
    {
      name: "TO DO",
      icon: faCircle,
      bgColor: "bg-gray-100",
      txtColor: "text-gray-800",
      status: "todo",
    },
  ];

  return (
    <div
      className={`${visibile} hs-accordion-group`}
      data-hs-accordion-always-open=""
    >
      {statusList.reverse().map((menu, index) => {
        const taskCount = appContext.getTaskCountByStatus(menu.status);
        return (
          <div
            className="hs-accordion mt-px-8 border first:rounded-t-lg last:rounded-b-lg"
            id={`hs-bordered-heading-${index}`}
            key={index}
          >
            <button
              className="hs-accordion-toggle inline-flex w-full items-center gap-x-3 px-5 py-4 text-start font-semibold text-gray-800 hover:text-gray-500 hs-accordion-active:text-blue-600"
              aria-expanded="false"
              aria-controls={`hs-basic-bordered-collapse-${index}`}
            >
              <FontAwesomeIcon
                icon={faCaretRight}
                className="block size-4 hs-accordion-active:hidden"
              />
              <FontAwesomeIcon
                icon={faCaretDown}
                className="hidden size-4 hs-accordion-active:block"
              />
              <div>
                <span
                  className={`inline-flex items-center gap-x-1 rounded-full ${menu.bgColor} px-2 py-1 text-xs font-medium ${menu.txtColor}`}
                >
                  <FontAwesomeIcon
                    icon={menu.icon}
                    className="size-4 shrink-0"
                  />
                  {`${menu.name} (${taskCount})`}
                </span>
              </div>
            </button>
            <div
              id={`hs-basic-bordered-collapse-${index}`}
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              role="region"
              aria-labelledby={`hs-bordered-heading-${index}`}
            >
              <TaskTableView status={menu.status} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

TaskListView.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default TaskListView;
