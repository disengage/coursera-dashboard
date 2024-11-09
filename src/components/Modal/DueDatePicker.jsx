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
import PropTypes from "prop-types";

dayjs.extend(isSameOrAfter);

const DueDatePicker = forwardRef(function DueDatePicker(
  { value, onChanged, onValid },
  ref,
) {
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
    reset: () => {
      datePicker.current = "";
      setError(errorMessage.none);
      setSelectedDate("");
      onChanged("");
      onValid("");
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
    onChanged(datePicker.current.value);
    const parseDate = dayjs(datePicker.current.value, "YYYY-MM-DD");
    if (!parseDate.isValid() || parseDate.isBefore(minDate)) {
      setError(errorMessage.invalid);
      setSelectedDate("");
      return;
    }
    if (parseDate.isSameOrAfter(minDate) && parseDate.isBefore(maxDate)) {
      setError(errorMessage.none);
      const parseValue = parseDate.format("YYYY-MM-DD");
      setSelectedDate(parseValue);
      onValid(parseValue);
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
        value={value}
        min={minDate.format("YYYY-MM-DD")}
        className={`${error ? errorStyle : ""} block w-full rounded-lg border px-4 py-3 text-sm`}
        placeholder="..."
        onChange={validateChange}
        ref={datePicker}
        onBlur={validateChange}
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

DueDatePicker.propTypes = {
  value: PropTypes.string,
  onChanged: PropTypes.func,
  onValid: PropTypes.func,
};

export default DueDatePicker;
