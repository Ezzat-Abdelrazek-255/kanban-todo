"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import {
  clearTodos,
  initializeTodos,
  startLoading,
} from "@/lib/features/todos/todosSlice";
import { createClient } from "@/utils/supabase/client";
import { redirect, usePathname } from "next/navigation";
import { TodoItem } from "@/types";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    const getTodos = async function() {
      storeRef.current?.dispatch(clearTodos());

      const supabase = createClient();
      const { error: authError, data: userData } =
        await supabase.auth.getUser();
      if (authError || !userData?.user) {
        redirect("/login");
      }

      storeRef.current?.dispatch(startLoading());
      const todos = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userData.user.id);

      if (!storeRef.current) return;
      storeRef.current.dispatch(
        initializeTodos({ todos: todos.data as TodoItem[] }),
      );
    };
    getTodos();
  }, [pathname]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
