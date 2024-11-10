import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import appStoreReducer from "./Store/AppStoreReducer";

import mockupProject from "../data/mockup-projects.json";
import mockupTask from "../data/mockup-tasks.json";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(appStoreReducer, {
    selectedProject: mockupProject.projects[0],
    selectedContentView: "TaskBoardView",
    data: {
      projects: mockupProject.projects,
      tasks: mockupTask,
    },
    editingTaskId: undefined,
    editingTask: undefined,
  });

  const getDataCount = (status) => {
    const filtered = data.data.tasks[data.selectedProject] ?? [];
    const dataByStatus = filtered.filter((task) => task.status === status);
    return dataByStatus.length;
  };

  const getToday = () => {
    let today = dayjs();
    today = today.hour(0);
    today = today.minute(0);
    today = today.second(0);
    today = today.millisecond(0);
    return today;
  };

  return (
    <AppContext.Provider
      value={{
        data,
        dispatch,
        dayjsToday: getToday(),
        getTaskCountByStatus: getDataCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.any,
};
