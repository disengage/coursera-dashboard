import PropTypes from "prop-types";
import { AppContext } from "../../providers/Contexts";

const TaskTableView = ({ status }) => {
  const getData = () => {
    return (
      <AppContext.Consumer>
        {(appContext) => {
          if (appContext.selectedContentView != "TaskListView") {
            // Avoid un-necessary re-render, Because consumer trigger every changes
            return;
          }

          const items = appContext.data.tasks[appContext.selectedProject] ?? [];
          const data = items.filter((item) => item.status === status) ?? [];

          if (data.length) {
            return data.map((data, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {data.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {data.desc}
                </td>
              </tr>
            ));
          } else {
            return (
              <tr>
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500"
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
