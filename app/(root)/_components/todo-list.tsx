import TodoListItem from "./todo-list-item";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { selectFilteredTodos } from "@/lib/features/todos/todosSlice";
import Loader from "@/components/loader";

const TodoList = () => {
  const isLoadingTodos = useSelector(
    (state: RootState) => state.todos.isLoading,
  );
  const filteredTodos = useSelector((state: RootState) =>
    selectFilteredTodos(state),
  );

  return (
    <ul className="mt-6 flex flex-col gap-4">
      {isLoadingTodos ? (
        <Loader className="border-foreground border-b-transparent" />
      ) : (
        filteredTodos.map((todo) => {
          return <TodoListItem key={todo.id} todo={todo} />;
        })
      )}
      {!isLoadingTodos && filteredTodos.length === 0 && (
        <p>
          You don&apos;t have any tasks click on the button below to create your
          first
        </p>
      )}
    </ul>
  );
};

export default TodoList;
