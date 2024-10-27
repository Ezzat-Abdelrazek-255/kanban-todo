import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "@/lib/features/todos/todosSlice";

export const makeStore = function() {
  return configureStore({
    reducer: {
      todos: todosReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
