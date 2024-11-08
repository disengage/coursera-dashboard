import { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../providers/Contexts";
import { HSOverlay } from "preline";
import "./TaskBoardView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleDot,
  faCircle,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import ModalAddNewTask from "../../Modal/ModalAddNewTask";
import ModalDeleteTask from "../../Modal/ModalDeleteTask";

const TaskBoardView = ({ visibility = true }) => {
  const visibile = visibility ? "" : "hidden";

  const appContext = useContext(AppContext);
  const requestDeleteRef = useRef({
    index: 0,
    status: undefined,
  });

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

  const deleteTask = (index, status) => {
    requestDeleteRef.current = { index, status };
    HSOverlay.open(document.querySelector("#hs-delete-modal"));
  };

  const onClickDeleteTask = () => {
    if (requestDeleteRef.current) {
      appContext.deleteTask(
        requestDeleteRef.current.index,
        requestDeleteRef.current.status,
      );
      requestDeleteRef.current = undefined;
    }
  };

  const getData = (status) => {
    return (
      <AppContext.Consumer>
        {(appContext) => {
          if (appContext.selectedContentView != "TaskBoardView") {
            // Avoid un-necessary re-render, Because consumer trigger every changes
            return;
          }

          const projectName = appContext.selectedProject;
          const tasks = appContext.data.tasks[projectName] ?? [];
          const data = tasks.filter((task) => task.status === status) ?? [];

          return data.map((task, index) => {
            return (
              <div
                className="task-card relative m-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm md:p-5"
                key={index}
              >
                <h3 className="truncate text-lg text-gray-800">{task.name}</h3>
                <p className="mt-1 truncate text-xs text-gray-400">
                  {task.desc == "" ? "-" : task.desc}
                </p>
                <span
                  className="task-delete absolute right-2 top-2 inline-flex size-[40px] items-center justify-center rounded-full border-4 border-red-100 bg-red-200 text-red-800"
                  onClick={() => deleteTask(index, status)}
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="size-3.5 shrink-0"
                  />
                </span>
              </div>
            );
          });
        }}
      </AppContext.Consumer>
    );
  };

  return (
    <>
      <div
        className={`${visibile} mt-4 size-full columns-3 gap-8 overflow-auto`}
      >
        {statusList.map((list, index) => {
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
                <div className="basis-1/4 p-2 text-right">
                  {appContext.getDataCount(list.status)}
                </div>
              </div>
              <div className="bg-gray-100">
                {getData(list.status)}
                <button
                  type="button"
                  className="inline-flex w-full items-center gap-x-2 px-4 pb-4 text-sm text-gray-400"
                  aria-haspopup="dialog"
                  aria-expanded="false"
                  aria-controls={`hs-basic-modal-${list.status}`}
                  data-hs-overlay={`#hs-basic-modal-${list.status}`}
                  data-hs-overlay-options="1234"
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="size-3.5 shrink-0"
                  />
                  Add Task
                </button>
              </div>
              <ModalAddNewTask status={list.status} />
            </div>
          );
        })}
      </div>
      <ModalDeleteTask onClickDelete={onClickDeleteTask} />
    </>
  );
};

TaskBoardView.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default TaskBoardView;
