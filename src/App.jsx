import { useContext, useRef, useState } from "react";
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
  const isInit = useRef(false);

  // Start app with initial state
  const [projectName, setProjectName] = useState(initialState.selectedProject);
  const [contentState, setContentState] = useState(
    initialState.selectedContentView,
  );

  // Start app with initial mockup data
  if (!isInit.current) {
    appContext.selectedProject = initialState.selectedProject;
    appContext.selectedContentView = initialState.selectedContentView;
    appContext.data = {
      projects: ["Project#1", "Project#2"],
      tasks: {
        ["Project#1"]: [
          {
            name: "Example1",
            desc: undefined,
            status: "todo",
          },
          {
            name: "Example2",
            desc: "Example description",
            status: "todo",
          },
          {
            name: "Example3",
            desc: "ภาษาไทย",
            status: "inprogress",
          },
          {
            name: "Changing a ref does not trigger a re-render",
            desc: "This means refs are perfect for storing information that doesn’t affect the visual output of your component.",
            status: "complete",
          },
        ],
        ["Project#2"]: [],
      },
    };
    isInit.current = true;
  }

  return (
    <>
      <AppContext.Provider value={appContext}>
        <div className="container relative mx-auto h-svh">
          <div className="flex flex-row">
            <div className="h-screen min-w-64 max-w-64 border border-neutral-200 bg-neutral-50 p-8">
              <SidebarView
                onClickMenu={(menu) => {
                  // Update app context data
                  appContext.selectedProject = menu;
                  // Update UI
                  setProjectName(menu);
                }}
              />
            </div>
            <div className="h-screen basis-full overflow-hidden border-r border-neutral-200 p-8">
              <NavBarMenu title={projectName} />
              <ContentMenu
                onClickMenu={(view) => {
                  // Update app context data
                  appContext.selectedContentView = view;
                  // Update UI
                  setContentState(view);
                }}
              />
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
