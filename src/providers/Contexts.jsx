import { createContext } from "react";

export const AppContext = createContext({
  selectedProject: undefined,
  selectedContentView: undefined,
  data: {
    projects: [],
    tasks: {},
  },
});
