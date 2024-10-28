"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { ArrowUpDown, Filter, List, WalletCards } from "lucide-react";
import TodoList from "../_components/todo-list";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import TodoView from "../_components/todo-view";
import { selectOpenTodo, setFilter } from "@/lib/features/todos/todosSlice";
import TodoFilter from "../_components/todo-filter";
import { TodoItem } from "@/types";
import { PRIORITY_FILTER_OPTIONS, STATE_FILTER_OPTIONS } from "@/constants";
import TodoSearch from "../_components/todo-search";
import TodoCreate from "../_components/todo-create";
import TodoEdit from "../_components/todo-edit";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const openTodo = useSelector((state: RootState) => selectOpenTodo(state));
  const [isCreatingTodo, setIsCreatingTodo] = useState(false);

  return (
    <main className="mt-8 h-full flex-grow">
      <Tabs defaultValue="list">
        <div className="w-full border-muted flex items-center justify-between border-[1px] rounded-[8px] p-4">
          <div className="flex items-center gap-4 font-sans text-base">
            <TodoSearch />
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
        <TabsContent value="list">
          <TodoList />
          <Button
            onClick={() => setIsCreatingTodo(true)}
            className="font-sans mt-6"
          >
            Create Task
          </Button>
        </TabsContent>
        {isCreatingTodo && <TodoCreate setIsOpen={setIsCreatingTodo} />}
        {openTodo && <TodoView todo={openTodo} />}
      </Tabs>
    </main>
  );
};

export default DashboardPage;
