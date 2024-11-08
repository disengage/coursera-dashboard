import { HSStaticMethods } from "preline";
import { AppContext } from "./providers/Contexts";
import "./App.css";

HSStaticMethods.autoInit();

import TaskBoardView from "./components/Task/TaskBoardView";
import TaskListView from "./components/Task/TaskListView";
import ContentMenu from "./components/Menu/ContentMenu";
import SidebarView from "./components/Sidebar/SidebarView";
import NavBarMenu from "./components/Menu/NavBarMenu";

function App() {
  return (
    <>
      <AppContext.Consumer>
        {(appContext) => {
          console.log(appContext);
          return (
            <div className="container relative mx-auto h-svh">
              <div className="flex flex-row">
                <div className="h-screen min-w-64 max-w-64 border border-neutral-200 bg-neutral-50 p-8">
                  <SidebarView
                    onClickMenu={(menu) => {
                      // Update app context data
                      appContext.setProjectName(menu);
                    }}
                  />
                </div>
                <div className="h-screen basis-full overflow-hidden border-r border-neutral-200 p-8">
                  <NavBarMenu title={appContext.projectName} />
                  <ContentMenu
                    onClickMenu={(view) => {
                      // Update app context data
                      appContext.setContentViewType(view);
                    }}
                  />
                  <TaskBoardView
                    visibility={
                      appContext.selectedContentView === "TaskBoardView"
                    }
                  />
                  <TaskListView
                    visibility={
                      appContext.selectedContentView === "TaskListView"
                    }
                  />
                </div>
              </div>
            </div>
          );
        }}
      </AppContext.Consumer>
    </>
  );
}

export default App;
