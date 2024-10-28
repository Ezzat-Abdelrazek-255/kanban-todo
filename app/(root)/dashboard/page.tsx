"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { List, WalletCards } from "lucide-react";
import TodoList from "../_components/todo-list";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import TodoView from "../_components/todo-view";
import {
  selectOpenTodo,
  setFilter,
  setView,
} from "@/lib/features/todos/todosSlice";
import TodoFilter from "../_components/todo-filter";
import { TodoItem, TodoState } from "@/types";
import { PRIORITY_FILTER_OPTIONS, STATE_FILTER_OPTIONS } from "@/constants";
import TodoSearch from "../_components/todo-search";
import TodoCreate from "../_components/todo-create";
import TodoCards from "../_components/todo-cards";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DashboardPage = () => {
  const dispatch = useDispatch();
  // Get currently opened todo item from Redux store
  const openTodo = useSelector((state: RootState) => selectOpenTodo(state));
  // Track current view mode (list or cards)
  const todosView = useSelector((state: RootState) => state.todos.view);

  // State for todo creation modal and default state when creating from kanban view
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);
  const [defaultState, setDefaultState] = useState<TodoState>();

  return (
    <main className="mt-8 h-full flex-grow">
      {/* Tabs component handling view switching between list and card views */}
      <Tabs
        defaultValue={todosView}
        onValueChange={(value) => dispatch(setView(value as "list" | "cards"))}
      >
        {/* Header section containing search and filters */}
        <div className="w-full border-muted flex items-center justify-between border-[1px] rounded-[8px] p-4">
          <div className="flex items-center gap-4 font-sans text-base">
            <TodoSearch />
            {/* Filter components for todo state and priority */}
            <TodoFilter
              placeholder="Filter by state"
              options={STATE_FILTER_OPTIONS}
              onChange={(state) =>
                dispatch(
                  setFilter({
                    state: state as TodoItem["state"],
                  }),
                )
              }
            />
            <TodoFilter
              placeholder="Filter by priority"
              options={PRIORITY_FILTER_OPTIONS}
              onChange={(state) =>
                dispatch(
                  setFilter({
                    priority: state as TodoItem["priority"],
                  }),
                )
              }
            />
          </div>
          {/* View mode toggles */}
          <TabsList>
            <TabsTrigger
              value="list"
              className="flex gap-1 items-center px-4 py-2"
            >
              <List size="18" />
              List
            </TabsTrigger>
            <TabsTrigger
              value="cards"
              className="flex gap-1 items-center px-4 py-2"
            >
              <WalletCards size="18" />
              Cards
            </TabsTrigger>
          </TabsList>
        </div>

        {/* List view content */}
        <TabsContent value="list">
          <TodoList />
          <Button
            onClick={() => setIsCreatingTodo(true)}
            className="font-sans mt-6"
          >
            Create Task
          </Button>
        </TabsContent>

        {/* Kanban card view with drag-and-drop functionality */}
        <TabsContent value="cards">
          <DndProvider backend={HTML5Backend}>
            <TodoCards
              setDefaultState={setDefaultState}
              setIsCreatingTodo={setIsCreatingTodo}
            />
          </DndProvider>
        </TabsContent>

        {/* Modals for creating and viewing todos */}
        {isCreatingTodo && (
          <TodoCreate
            setIsOpen={setIsCreatingTodo}
            defaultState={defaultState}
          />
        )}
        {openTodo && <TodoView todo={openTodo} />}
      </Tabs>
    </main>
  );
};

export default DashboardPage;
