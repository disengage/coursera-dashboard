import PropTypes from "prop-types";
import { HSOverlay } from "preline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalDeleteTask = ({ onClickDelete }) => {
  const onClickDeleteBtn = () => {
    HSOverlay.close(document.querySelector("#hs-delete-modal"));
    onClickDelete && onClickDelete();
  };

  return (
    <>
      <div
        id="hs-delete-modal"
        className="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden opacity-0 transition-all hs-overlay-open:opacity-100 hs-overlay-open:duration-500"
        role="dialog"
        tabIndex="-1"
        aria-labelledby="hs-delete-modal-label"
      >
        <div className="m-3 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3
                id="hs-delete-modal-label"
                className="font-bold text-gray-800"
              >
                Delete Task
              </h3>
              <button
                type="button"
                className="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800"
                aria-label="Close"
                data-hs-overlay="#hs-delete-modal"
              >
                <span className="sr-only">Close</span>
                <FontAwesomeIcon icon={faXmark} className="size-4 shrink-0" />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <p className="mt-1 text-gray-800">
                Are you sure to delete this task?
              </p>
            </div>
            <div className="flex items-center justify-end gap-x-2 border-t px-4 py-3">
              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-red-600 px-3 py-2 text-sm font-medium text-white"
                onClick={onClickDeleteBtn}
              >
                Delete
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm"
                data-hs-overlay="#hs-delete-modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalDeleteTask.propTypes = {
  onClickDelete: PropTypes.func.isRequired,
};

export default ModalDeleteTask;
