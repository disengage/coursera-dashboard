import { useContext } from "react";
import { AppContext } from "../../providers/Contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleDot,
  faCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const TaskBoardView = ({ visibility = true }) => {
  const visibile = visibility ? "" : "hidden";

  const appContext = useContext(AppContext);
  const projectName = appContext.selectedProject;

  const statusList = [
    { name: "TO DO", icon: faCircle, color: "bg-gray-600", status: "todo" },
    {
      name: "IN PROGRESS",
      icon: faCircleDot,
      color: "bg-blue-600",
      status: "inprogress",
    },
    {
      name: "COMPLETE",
      icon: faCircleCheck,
      color: "bg-teal-800",
      status: "complete",
    },
  ];

  return (
    <div className={`${visibile} mt-4 size-full columns-3 gap-8 overflow-auto`}>
      {statusList.map((list, index) => {
        const tasks = appContext.data.tasks[projectName] ?? [];
        const data = tasks.filter((task) => task.status === list.status) ?? [];
        return (
          <div className="flex h-full flex-col" key={index}>
            <div className="flex flex-row bg-gray-100 p-2">
              <div className="basis-3/4">
                <span
                  className={`m-2 inline-flex items-center gap-x-1 rounded-full ${list.color} px-2 py-1 text-xs text-white`}
                >
                  <FontAwesomeIcon
                    icon={list.icon}
                    className="size-4 shrink-0"
                  />
                  {list.name}
                </span>
              </div>
              <div className="basis-1/4 p-2 text-right">{data.length}</div>
            </div>
            <div className="bg-gray-100">
              {data.map((task, index) => {
                return (
                  <div
                    className="m-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm md:p-5"
                    key={index}
                  >
                    <h3 className="truncate text-lg text-gray-800">
                      {task.name}
                    </h3>
                    <p className="mt-1 truncate text-xs font-medium text-gray-500">
                      {task.desc}
                    </p>
                  </div>
                );
              })}

              <button
                type="button"
                className="inline-flex w-full items-center gap-x-2 px-4 pb-4 text-sm text-gray-400"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-basic-modal"
                data-hs-overlay="#hs-basic-modal"
              >
                <FontAwesomeIcon icon={faPlus} className="size-3.5 shrink-0" />
                Add Task
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

TaskBoardView.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default TaskBoardView;
