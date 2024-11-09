import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext,
} from "react";
import { AppContext } from "../../providers/Contexts";

dayjs.extend(isSameOrAfter);

const DueDatePicker = forwardRef(function DueDatePicker(props, ref) {
  const datePicker = useRef();
  const [error, setError] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const appContext = useContext(AppContext);

  const errorStyle = "border-red-500 focus:border-red-500 focus:ring-red-500";

  // Expose functions to the parent using useImperativeHandle
  useImperativeHandle(ref, () => ({
    isInvalid: (enabled) => {
      setError(enabled ? errorMessage.invalid : errorMessage.none);
    },
    getSelected: () => {
      return selectedDate;
    },
  }));

  let minDate = appContext.dayjsToday;
  const maxDate = minDate.add(1, "year");

  const errorMessage = {
    none: undefined,
    invalid: "The selected date is invalid or less than today.",
    tooLong: "You can't select a date further than 1 year.",
  };

  const validateChange = () => {
    const parseDate = dayjs(datePicker.current.value, "YYYY-MM-DD");
    if (!parseDate.isValid() || parseDate.isBefore(minDate)) {
      setError(errorMessage.invalid);
      setSelectedDate("");
      return;
    }
    if (parseDate.isSameOrAfter(minDate) && parseDate.isBefore(maxDate)) {
      setError(errorMessage.none);
      setSelectedDate(parseDate.format("YYYY-MM-DD"));
    } else {
      setError(errorMessage.tooLong);
      setSelectedDate("");
    }
  };

  return (
    <>
      <input
        type="date"
        id="start"
        name="trip-start"
        min={minDate.format("YYYY-MM-DD")}
        className={`${error ? errorStyle : ""} block w-full rounded-lg border px-4 py-3 text-sm`}
        placeholder="..."
        onChange={validateChange}
        ref={datePicker}
      />
      {error ? (
        <p
          className="mt-2 text-sm text-red-600"
          id="hs-validation-name-error-helper"
        >
          {error}
        </p>
      ) : (
        <></>
      )}
    </>
  );
});

export default DueDatePicker;
