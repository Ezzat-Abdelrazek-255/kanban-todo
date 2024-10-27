import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoItem } from "@/types";
import { snakeToCamel } from "@/utils";

type TodoState = {
  todos: TodoItem[];
  filter: {
    priority: "all" | "low" | "medium" | "high";
    state: "all" | "todo" | "doing" | "done";
    search: string;
  };
  isLoading: boolean;
};

const initialState: TodoState = {
  todos: [],
  filter: {
    priority: "all",
    state: "all",
    search: "",
  },
  isLoading: true,
};
const findTodoIndex = function(id: string, todos: TodoItem[]) {
  return todos.findIndex((todo) => todo.id === id);
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    initializeTodos: (state, action: PayloadAction<{ todos: TodoItem[] }>) => {
      const initialTodos: TodoItem[] = [];
      action.payload.todos.forEach((todo) => {
        const newTodo = {};
        const todosKeys = Object.keys(todo);
        const todosValues = Object.values(todo);
        todosKeys.forEach((key: string, i: number): void => {
          (newTodo as Record<string, string | boolean | FileList>)[
            snakeToCamel(key)
          ] = todosValues[i];
        });
        initialTodos.push(newTodo as TodoItem);
      });

      state.todos = initialTodos;
      state.isLoading = false;
    },
    openTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todoIndex = findTodoIndex(action.payload.id, state.todos);

      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          isOpen: true,
        };
      }
    },
    closeTodo: (state, action: PayloadAction<{ id: string }>) => {
      const todoIndex = findTodoIndex(action.payload.id, state.todos);
      if (todoIndex != -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          isOpen: false,
        };
      }
    },
    addTodo: (
      state,
      action: PayloadAction<Omit<TodoItem, "createdAt" | "updatedAt">>,
    ) => {
      const newTodo: TodoItem = {
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<TodoItem> }>,
    ) => {
      const { id, updates } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<Partial<TodoState["filter"]>>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filter = initialState.filter;
    },
    updateTodoState: (
      state,
      action: PayloadAction<{ id: string; newState: TodoItem["state"] }>,
    ) => {
      const { id, newState } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].state = newState;
        state.todos[todoIndex].updatedAt = new Date().toISOString();
      }
    },
    updatePriority: (
      state,
      action: PayloadAction<{ id: string; priority: TodoItem["priority"] }>,
    ) => {
      const { id, priority } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex].priority = priority;
        state.todos[todoIndex].updatedAt = new Date().toISOString();
      }
    },
  },
});

export const selectOpenTodo = (state: { todos: TodoState }) => {
  return state.todos.todos.find((todo) => todo.isOpen);
};

export const selectFilteredTodos = (state: { todos: TodoState }) => {
  const { todos, filter } = state.todos;
  return todos.filter((todo) => {
    const matchesPriority =
      filter.priority === "all" || todo.priority === filter.priority;
    const matchesState = filter.state === "all" || todo.state === filter.state;
    const matchesSearch =
      todo.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      todo.description.toLowerCase().includes(filter.search.toLowerCase());

    return matchesPriority && matchesState && matchesSearch;
  });
};

export const {
  initializeTodos,
  openTodo,
  closeTodo,
  addTodo,
  updateTodo,
  deleteTodo,
  setFilter,
  clearFilters,
  updateTodoState,
  updatePriority,
} = todosSlice.actions;

export default todosSlice.reducer;
