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
// import ScreenSizeHelper from "./components/Helper/ScreenSizeHelper";

function App() {
  return (
    <>
      <div className="xs:max-w-[100%] container relative mx-auto h-screen">
        <div className="xs:flex-col sm:flex-col md:flex-col xl:flex 2xl:flex">
          <AppContext.Consumer>
            {(appContext) => {
              console.log(appContext);
              return (
                <>
                  <SidebarViewSM
                    onClickMenu={(menu) => appContext.setProjectName(menu)}
                  />
                  <SidebarView
                    onClickMenu={(menu) => appContext.setProjectName(menu)}
                  />
                  <div className="mb-10 min-h-svh grow border-neutral-200 p-8 pb-10 max-sm:p-0">
                    <NavBarMenu title={appContext.projectName} />
                    <ContentMenu
                      onClickMenu={(view) =>
                        appContext.setContentViewType(view)
                      }
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
