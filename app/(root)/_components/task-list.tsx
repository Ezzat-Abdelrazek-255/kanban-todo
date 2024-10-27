import React from "react";
import TaskListItem from "./task-list-item";
import { TEST_TODOS } from "@/constants";

const TaskList = () => {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {TEST_TODOS.map((todo) => {
        return <TaskListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TaskList;
