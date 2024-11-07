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

  return (
    <div className={`${visibile} mt-4 size-full columns-3 gap-8 overflow-auto`}>
      <div className="flex h-full flex-col">
        <div className="flex flex-row bg-gray-100 p-2">
          <div className="basis-3/4">
            <span className="m-2 inline-flex items-center gap-x-1 rounded-full bg-gray-600 px-2 py-1 text-xs text-white">
              <FontAwesomeIcon icon={faCircle} className="size-4 shrink-0" />
              TO DO
            </span>
          </div>
          <div className="basis-1/4 p-2 text-right">05</div>
        </div>
        <div className="bg-gray-100">
          {["Example1", "Example2"].map((task) => {
            return (
              <div
                className="m-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm md:p-5"
                key={task}
              >
                <h3 className="text-lg text-gray-800">{task}</h3>
                <p className="mt-1 text-xs font-medium uppercase text-gray-500">
                  Card subtitle
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

      <div className="flex h-full flex-col">
        <div className="flex flex-row bg-gray-100 p-2">
          <div className="basis-3/4">
            <span className="m-2 inline-flex items-center gap-x-1 rounded-full bg-blue-600 px-1.5 py-1 text-xs text-white">
              <FontAwesomeIcon icon={faCircleDot} className="size-4 shrink-0" />
              IN PROGRESS
            </span>
          </div>
          <div className="basis-1/4 p-2 text-right">05</div>
        </div>
        <div className="bg-gray-100"></div>
      </div>

      <div className="flex h-full flex-col">
        <div className="flex flex-row bg-gray-100 p-2">
          <div className="basis-3/4">
            <span className="m-2 inline-flex items-center gap-x-1 rounded-full bg-teal-800 px-2 py-1 text-xs text-white">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="size-4 shrink-0"
              />
              COMPLETE
            </span>
          </div>
          <div className="basis-1/4 p-2 text-right">05</div>
        </div>
        <div className="bg-gray-100"></div>
      </div>
    </div>
  );
};

TaskBoardView.propTypes = {
  visibility: PropTypes.bool.isRequired,
};

export default TaskBoardView;
