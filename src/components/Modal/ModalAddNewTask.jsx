import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalAddNewTask = () => {
  return (
    <div
      id="hs-basic-modal"
      className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden opacity-0 transition-all"
      role="dialog"
      tabIndex="-1"
      aria-labelledby="hs-basic-modal-label"
    >
      <div className="m-3 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 id="hs-basic-modal-label" className="font-bold text-gray-800">
              Add New Task
            </h3>
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              aria-label="Close"
              data-hs-overlay="#hs-basic-modal"
            >
              <span className="sr-only">Close</span>
              <FontAwesomeIcon icon={faXmark} className="size-4 shrink-0" />
            </button>
          </div>
          <div className="overflow-y-auto p-4">
            <p className="mt-1 text-gray-800">
              This is a wider card with supporting text below as a natural
              lead-in to additional content.
            </p>
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t px-4 py-3">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              Add
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              data-hs-overlay="#hs-basic-modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddNewTask;
