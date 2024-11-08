/* eslint-disable */
import PropTypes from "prop-types";
import { createContext, useState, useRef } from "react";

import mockupProject from "../data/mockup-projects.json";
import mockupTask from "../data/mockup-tasks.json";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const isInit = useRef(false);

  const [selectedProject, setProjectName] = useState("");
  const [selectedContentView, setContentViewType] = useState("");
  const [data, setData] = useState({
    projects: [],
    tasks: {},
  });

  // Start app with initial state
  const initialState = {
    selectedProject: "Project#1",
    selectedContentView: "TaskBoardView",
  };

  // Start app with initial mockup data
  if (!isInit.current) {
    console.log("Initial app data");
    setProjectName(initialState.selectedProject);
    setContentViewType(initialState.selectedContentView);
    setData({
      projects: mockupProject.projects,
      tasks: mockupTask,
    });
    isInit.current = true;
  }

  const addNewTask = ({ name, desc, status }) => {
    if (!data.tasks[selectedProject]) {
      data.tasks[selectedProject] = [];
    }
    const task = {
      name,
      desc,
      status,
    };
    console.log(task);
    data.tasks[selectedProject].push(task);
    setData({ ...data });
  };

  const deleteTask = (index, status) => {
    if (!data.tasks[selectedProject]) {
      return;
    }
    const search = data.tasks[selectedProject]
      .filter((task) => task.status === status)
      .at(0);
    const indexed = data.tasks[selectedProject].indexOf(search);
    data.tasks[selectedProject].splice(indexed, 1);
    setData({ ...data });
  };

  const getDataCount = (status) => {
    const filtered = data.tasks[selectedProject] ?? [];
    const dataByStatus = filtered.filter((task) => task.status === status);
    return dataByStatus.length;
  };

  return (
    <AppContext.Provider
      value={{
        selectedProject,
        selectedContentView,
        data,
        addNewTask,
        deleteTask,
        setProjectName,
        setContentViewType,
        getDataCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.any,
};
