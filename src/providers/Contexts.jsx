/* eslint-disable */
import { createContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

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
    selectedProject: mockupProject.projects[0],
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

  const addNewTask = ({ name, desc, status, date }) => {
    if (!data.tasks[selectedProject]) {
      data.tasks[selectedProject] = [];
    }
    const task = {
      id: uuidv4(),
      name,
      desc,
      status,
      dueDate: date,
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

  const updateTaskStatus = (id, status) => {
    if (!data.tasks[selectedProject]) {
      return;
    }
    const filtered = data.tasks[selectedProject].filter(
      (task) => task.id === id,
    );
    if (filtered.length) {
      const indexed = data.tasks[selectedProject].indexOf(filtered.at(0));
      data.tasks[selectedProject][indexed].status = status;
      setData({ ...data });
    }
  };

  let today = dayjs();
  today = today.hour(0);
  today = today.minute(0);
  today = today.second(0);
  today = today.millisecond(0);

  return (
    <AppContext.Provider
      value={{
        selectedProject,
        selectedContentView,
        data,
        setData,
        addNewTask,
        deleteTask,
        setProjectName,
        setContentViewType,
        getDataCount,
        updateTaskStatus,
        dayjsToday: today,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.any,
};
