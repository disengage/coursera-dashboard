const appStoreReducer = (store, action) => {
  const projectName = store.selectedProject;

  switch (action.type) {
    case "setProjectName":
      store.selectedProject = action.name;
      return { ...store };
    case "setContentViewType":
      store.selectedContentView = action.name;
      return { ...store };
    case "addTask": {
      const tasks = store.data.tasks;
      // Initial project key, If need
      if (!tasks[projectName]) {
        tasks[projectName] = [];
      }
      // Skip add if exist
      const exist =
        tasks[projectName].findIndex((task) => task.id === action.task.id) >= 0;
      if (!exist) {
        tasks[projectName] = [...tasks[projectName], action.task];
      }
      return { ...store, data: { ...store.data, tasks: { ...tasks } } };
    }
    case "updateTask": {
      const filtered = store.data.tasks[projectName].filter(
        (task) => task.id === action.id,
      );
      if (filtered.length) {
        const indexed = store.data.tasks[projectName].indexOf(filtered.at(0));
        store.data.tasks[projectName][indexed] = action.task;
      }
      return { ...store };
    }
    case "deleteTask": {
      const filtered = store.data.tasks[projectName].filter(
        (task) => task.id === action.id,
      );
      if (filtered.length) {
        const indexed = store.data.tasks[projectName].indexOf(filtered.at(0));
        store.data.tasks[projectName].splice(indexed, 1);
      }
      return { ...store };
    }
    case "updateTaskStatus": {
      const filtered = store.data.tasks[projectName].filter(
        (task) => task.id === action.id,
      );
      if (filtered.length) {
        const indexed = store.data.tasks[projectName].indexOf(filtered.at(0));
        store.data.tasks[projectName][indexed].status = action.status;
      }
      return { ...store };
    }
    case "setEditingTaskId":
      store.editingTaskId = action.id;
      if (action.id) {
        const filtered = store.data.tasks[projectName].filter(
          (task) => task.id === action.id,
        );
        if (filtered.length) {
          store.editingTask = filtered.at(0);
        }
      } else {
        store.editingTask = undefined;
      }
      return { ...store };
    default:
      return { ...store };
  }
};

export default appStoreReducer;
