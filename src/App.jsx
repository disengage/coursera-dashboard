import { useContext, useEffect, useState } from "react";
import { HSStaticMethods } from "preline";
import { AppContext } from "./providers/Contexts";
import "./App.css";

HSStaticMethods.autoInit();

import ModalAddNewTask from "./components/Modal/ModalAddNewTask";
import TaskBoardView from "./components/Task/TaskBoardView";
import TaskListView from "./components/Task/TaskListView";
import ContentMenu from "./components/Menu/ContentMenu";
import SidebarView from "./components/Sidebar/SidebarView";
import NavBarMenu from "./components/Menu/NavBarMenu";

function App() {
  const initialState = {
    selectedProject: "Project#1",
    selectedContentView: "TaskBoardView",
  };

  const appContext = useContext(AppContext);

  // Start app with initial state
  const [projectName, setProjectName] = useState(initialState.selectedProject);
  const [contentState, setContentState] = useState(
    initialState.selectedContentView,
  );

  const currentState = {
    selectedProject: projectName,
    selectedContentView: contentState,
  };

  useEffect(() => {
    // If the user changes project name from sidebar menu
    // then reset main content tab to first tab
    if (appContext.selectedProject !== projectName) {
      setContentState(initialState.selectedContentView);
    }
  }, [appContext, initialState.selectedContentView, projectName]);

  return (
    <>
      <AppContext.Provider value={currentState}>
        <div className="container relative mx-auto h-svh">
          <div className="flex flex-row">
            <div className="h-screen min-w-64 max-w-64 border border-neutral-200 bg-neutral-50 p-8">
              <SidebarView onClickMenu={(menu) => setProjectName(menu)} />
            </div>
            <div className="h-screen basis-full overflow-hidden border-r border-neutral-200 p-8">
              <NavBarMenu title={projectName} />
              <ContentMenu onClickMenu={(named) => setContentState(named)} />
              <TaskBoardView visibility={contentState === "TaskBoardView"} />
              <TaskListView visibility={contentState === "TaskListView"} />
            </div>
          </div>
          <ModalAddNewTask />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
