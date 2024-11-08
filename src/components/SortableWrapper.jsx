import { ReactSortable } from "react-sortablejs";
import PropTypes from "prop-types";

const SortableWrapper = ({ status, children, list, onEnd }) => {
  return (
    <ReactSortable
      id={status}
      group="groupName"
      list={[...list]}
      setList={() => {}}
      onAdd={(e) => onEnd(e)}
      className="min-h-[100px]"
    >
      {children}
    </ReactSortable>
  );
};

SortableWrapper.propTypes = {
  status: PropTypes.string,
  children: PropTypes.any,
  list: PropTypes.array,
  onEnd: PropTypes.func,
};

export default SortableWrapper;
