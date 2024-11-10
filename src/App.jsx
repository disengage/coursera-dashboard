import { useContext } from "react";
import { HSStaticMethods } from "preline";
import { AppContext } from "./providers/Contexts";
import "./App.css";

HSStaticMethods.autoInit();

import TaskBoardView from "./components/Task/TaskBoardView/TaskBoardView";
import TaskListView from "./components/Task/TaskListView";
import ContentMenu from "./components/Menu/ContentMenu";
import SidebarView from "./components/Sidebar/SidebarView";
import SidebarViewSM from "./components/Sidebar/SidebarView-sm";
import NavBarMenu from "./components/Menu/NavBarMenu";
import ModalAddNewTask from "./components/Modal/ModalAddNewTask";
// import ScreenSizeHelper from "./components/Helper/ScreenSizeHelper";

function App() {
  const appContext = useContext(AppContext);

  const setProjectName = (name) => {
    appContext.dispatch({ type: "setProjectName", name });
  };

  const setContentViewType = (name) => {
    appContext.dispatch({ type: "setContentViewType", name });
  };

  return (
    <>
      <div className="container relative mx-auto h-screen xs:max-w-[100%]">
        <div className="xs:flex-col sm:flex-col md:flex-col xl:flex 2xl:flex">
          <AppContext.Consumer>
            {(appContext) => {
              console.log(appContext.data);
              const projectName = appContext.data?.selectedProject;
              const selectedContentView = appContext.data?.selectedContentView;
              return (
                <>
                  <SidebarViewSM onClickMenu={(menu) => setProjectName(menu)} />
                  <SidebarView
                    menu={appContext.data.data.projects}
                    onClickMenu={(menu) => setProjectName(menu)}
                  />
                  <div className="max-sm:p-0 mb-10 min-h-svh grow border-neutral-200 p-8 pb-10">
                    <NavBarMenu title={projectName} />
                    <ContentMenu
                      onClickMenu={(view) => setContentViewType(view)}
                    />
                    <TaskBoardView
                      visibility={selectedContentView === "TaskBoardView"}
                    />
                    <TaskListView
                      visibility={selectedContentView === "TaskListView"}
                    />
                  </div>
                  <ModalAddNewTask editMode={true} />
                </>
              );
            }}
          </AppContext.Consumer>
          {/* <ScreenSizeHelper /> */}
        </div>
      </div>
    </>
  );
}

export default App;
