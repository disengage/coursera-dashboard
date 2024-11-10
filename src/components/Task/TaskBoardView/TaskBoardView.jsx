import { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../../providers/Contexts";
import { HSOverlay } from "preline";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

import "./TaskBoardView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleDot,
  faCircle,
  faPlus,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import ModalAddNewTask from "../../Modal/ModalAddNewTask";
import ModalDeleteTask from "../../Modal/ModalDeleteTask";
import SortableWrapper from "../../SortableWrapper";

const TaskBoardView = ({ visibility = true }) => {
  const visibile = visibility ? "" : "hidden";

  const appContext = useContext(AppContext);
  const requestDeleteRef = useRef();

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

  const deleteTask = (id) => {
    requestDeleteRef.current = id;
    HSOverlay.open(document.querySelector("#hs-delete-modal"));
  };

  const editTask = (index) => {
    appContext.dispatch({ type: "setEditingTaskId", id: index });
    HSOverlay.open(document.querySelector("#hs-edit-modal"));
  };

  const onClickDeleteTask = () => {
    if (requestDeleteRef.current) {
      appContext.dispatch({ type: "deleteTask", id: requestDeleteRef.current });
      requestDeleteRef.current = undefined;
    }
  };

  const onEndCardDrag = (sortableEvent) => {
    try {
      const rawId = sortableEvent.item.dataset["id"] ?? "";
      const to = sortableEvent.to.parentElement?.id ?? "";
      const target = sortableEvent.originalEvent.target.parentElement.id ?? "";
      const status = to == "" ? target : to;
      if (rawId != "" && status != "") {
        const matched = rawId.match(/task-id-(.+)/);
        const taskId = matched.length >= 2 ? matched[1] : 0;
        appContext.dispatch({ type: "updateTaskStatus", id: taskId, status });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getData = (status) => {
    return (
      <AppContext.Consumer>
        {(appContext) => {
          const selectedProject = appContext.data.selectedProject;
          const selectedContentView = appContext.data.selectedContentView;
          if (selectedContentView != "TaskBoardView") {
            // Avoid un-necessary re-render, Because consumer trigger every changes
            return;
          }

          const tasks = appContext.data.data.tasks[selectedProject] ?? [];
          const data = tasks.filter((task) => task.status === status) ?? [];

          return (
            <SortableWrapper list={data} onEnd={onEndCardDrag}>
              {data.map((task) => {
                const dueDate = dayjs(task.dueDate);
                const dayLeft = dayjs(dueDate).from(appContext.dayjsToday);
                return (
                  <div
                    className="task-card relative my-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm"
                    key={`task-id-${task.id}`}
                  >
                    <h3 className="mx-2 mt-2 whitespace-normal text-lg text-gray-800">
                      {task.name}
                    </h3>
                    <div className="mx-2 mb-2 mt-1 whitespace-normal text-sm text-gray-400">
                      <div className="flex">
                        <div className="flex-auto">
                          Due Date: {dayjs(dueDate).format("D MMM YYYY")}
                        </div>
                        <div className="flex-none">{dayLeft}</div>
                      </div>
                    </div>
                    <span
                      className="task-delete absolute right-2 top-2 inline-flex size-[40px] items-center justify-center rounded-full border-4 border-red-100 bg-red-200 text-red-800"
                      onClick={() => deleteTask(task.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="size-3.5 shrink-0"
                      />
                    </span>
                    <span
                      className="task-edit absolute right-2 top-2 inline-flex size-[40px] items-center justify-center rounded-full border-4 border-green-100 bg-green-200 text-green-800"
                      onClick={() => editTask(task.id)}
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="size-3.5 shrink-0"
                      />
                    </span>
                  </div>
                );
              })}
            </SortableWrapper>
          );
        }}
      </AppContext.Consumer>
    );
  };

  return (
    <>
      <div
        className={`${visibile} mt-4 gap-8 sm:columns-1 md:columns-1 lg:columns-3 xl:columns-3 2xl:columns-3`}
      >
        {statusList.map((list, index) => {
          const taskCount = appContext.getTaskCountByStatus(list.status);
          return (
            <div
              className="mb-6 h-screen w-full rounded-lg xs:h-fit sm:h-fit md:h-fit 2xl:mb-0"
              key={index}
            >
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
                <div className="basis-1/4 p-2 text-right">{taskCount}</div>
              </div>
              <div
                className="relative min-h-[126px] bg-gray-100 px-4 pb-10 pt-[1px]"
                id={list.status}
              >
                {getData(list.status)}
                <button
                  type="button"
                  className="absolute inset-x-0 bottom-0 inline-flex w-full items-center gap-x-2 p-4 text-sm text-gray-400"
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
