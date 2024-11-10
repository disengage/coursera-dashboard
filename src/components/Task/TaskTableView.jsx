import PropTypes from "prop-types";
import { AppContext } from "../../providers/Contexts";
import dayjs from "dayjs";

const TaskTableView = ({ status }) => {
  const getData = () => {
    return (
      <AppContext.Consumer>
        {(appContext) => {
          const selectedProject = appContext.data.selectedProject;
          const selectedContentView = appContext.data.selectedContentView;
          if (selectedContentView != "TaskListView") {
            // Avoid un-necessary re-render, Because consumer trigger every changes
            return;
          }

          const items = appContext.data.data.tasks[selectedProject] ?? [];
          const data = items.filter((item) => item.status === status) ?? [];

          if (data.length) {
            return data.map((data, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4 align-top text-sm">
                  {dayjs(data.dueDate).format("D MMM YYYY")}
                </td>
                <td className="whitespace-nowrap text-wrap px-6 py-4 align-top text-sm">
                  {data.name}
                </td>
                <td className="whitespace-nowrap text-wrap px-6 py-4 align-top text-sm">
                  {data.desc}
                </td>
              </tr>
            ));
          } else {
            return (
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-gray-300">-</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-300">-</td>
                <td className="whitespace-nowrap px-6 py-4 text-gray-300">-</td>
              </tr>
            );
          }
        }}
      </AppContext.Consumer>
    );
  };

  return (
    <div className="mx-8 mb-8 flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="inline-block min-w-full p-1.5 align-middle">
          <div className="overflow-hidden rounded-lg border">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="w-[120px] px-6 py-3 text-start text-xs font-medium text-gray-500"
                  >
                    Due Date
                  </th>
                  <th
                    scope="col"
                    className="w-[400px] px-6 py-3 text-start text-xs font-medium text-gray-500"
                  >
                    Task
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">{getData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskTableView.propTypes = {
  status: PropTypes.string.isRequired,
};

export default TaskTableView;
