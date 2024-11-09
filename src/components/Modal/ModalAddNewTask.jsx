import { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../../providers/Contexts";
import { HSOverlay } from "preline";
import DueDatePicker from "./DueDatePicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalAddNewTask = ({ status }) => {
  const appContext = useContext(AppContext);

  const txtTaskNameRef = useRef();
  const txtTaskDateRef = useRef();
  const txtTaskDescRef = useRef();

  const borderStyle = {
    nornal: "border-gray-200 focus:border-blue-500 focus:ring-blue-500",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };

  const [txtTaskNameStyle, setTxtTaskNameStyle] = useState(borderStyle.nornal);

  const validateInput = () => {
    const name = txtTaskNameRef.current?.value ?? "";
    const date = txtTaskDateRef.current.getSelected();
    const desc = txtTaskDescRef.current?.value ?? "";

    if (name !== "" && date !== "") {
      setTxtTaskNameStyle(borderStyle.nornal);
      txtTaskDateRef.current.isInvalid(false);
      appContext.addNewTask({ name, desc, status, date });
      HSOverlay.close(document.querySelector(`#hs-basic-modal-${status}`));
    } else {
      if (date === "") {
        txtTaskDateRef.current?.isInvalid(true);
      }
      if (name === "") {
        setTxtTaskNameStyle(borderStyle.error);
      }
    }
  };

  const onTaskNameChange = () => {
    const name = txtTaskNameRef.current.value;
    setTxtTaskNameStyle(name === "" ? borderStyle.error : borderStyle.nornal);
  };

  const InputForm = () => {
    return (
      <>
        <div className="max-w">
          <div className="flex items-center justify-between">
            <label
              htmlFor="with-corner-hint"
              className="mb-2 block text-sm font-medium"
            >
              Name
            </label>
          </div>
          <input
            type="text"
            id="with-corner-hint"
            className={`${txtTaskNameStyle} block w-full rounded-lg border px-4 py-3 text-sm`}
            placeholder="..."
            ref={txtTaskNameRef}
            required={true}
            onChange={onTaskNameChange}
          />
          {txtTaskNameStyle == borderStyle.error ? (
            <p className="mt-2 text-sm text-red-600">
              {"Task name can't be empty."}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="max-w mt-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="with-corner-hint"
              className="mb-2 block text-sm font-medium"
            >
              Due Date
            </label>
            <span className="mb-2 block text-xs text-gray-400">
              Select a date from today and within 1 year.
            </span>
          </div>
          <DueDatePicker ref={txtTaskDateRef} />
        </div>
        <div className="max-w mt-4">
          <label
            htmlFor="textarea-label-with-helper-text"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="textarea-label-with-helper-text"
            className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm"
            rows={3}
            placeholder="..."
            aria-describedby="hs-textarea-helper-text"
            ref={txtTaskDescRef}
          ></textarea>
          <p
            className="mt-2 text-xs text-gray-500"
            id="hs-textarea-helper-text"
          >
            * Optional
          </p>
        </div>
      </>
    );
  };

  const StatusBadge = () => {
    const statusList = [
      { name: "TO DO", color: "bg-gray-600", status: "todo" },
      {
        name: "IN PROGRESS",
        color: "bg-blue-600",
        status: "inprogress",
      },
      {
        name: "COMPLETE",
        color: "bg-teal-800",
        status: "complete",
      },
    ];
    const list = statusList.filter((list) => list.status === status)[0];
    return (
      <div className="grow">
        <span
          className={`m-2 inline-flex items-center gap-x-1 rounded-full ${list.color} px-2 py-1 text-xs text-white`}
        >
          {list.name}
        </span>
      </div>
    );
  };

  return (
    <div
      id={`hs-basic-modal-${status}`}
      className="hs-overlay pointer-events-none fixed start-0 top-0 z-[80] hidden size-full overflow-y-auto overflow-x-hidden opacity-0 transition-all hs-overlay-open:opacity-100 hs-overlay-open:duration-500"
      role="dialog"
      tabIndex={-1}
    >
      <div className="m-3 mx-auto w-full max-w-lg">
        <div className="pointer-events-auto flex flex-col rounded-xl border bg-white shadow-sm">
          <div className="flex items-center border-b px-4 py-3">
            <h3 className="flex-none font-bold text-gray-800">New Task</h3>
            <StatusBadge />
            <button
              type="button"
              className="inline-flex size-8 flex-none items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none"
              aria-label="Close"
              data-hs-overlay={`#hs-basic-modal-${status}`}
            >
              <span className="sr-only">Close</span>
              <FontAwesomeIcon icon={faXmark} className="size-4 shrink-0" />
            </button>
          </div>
          <div className="overflow-y-auto p-4">
            <InputForm />
          </div>
          <div className="flex items-center justify-end gap-x-2 border-t px-4 py-3">
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
              onClick={validateInput}
            >
              Add
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
              data-hs-overlay={`#hs-basic-modal-${status}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalAddNewTask.propTypes = {
  status: PropTypes.string.isRequired,
};

export default ModalAddNewTask;
