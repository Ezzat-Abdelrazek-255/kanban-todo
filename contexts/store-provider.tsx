"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { initializeTodos } from "@/lib/features/todos/todosSlice";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    const getTodos = async function() {
      const supabase = createClient();
      const { error: authError, data: userData } =
        await supabase.auth.getUser();
      if (authError || !userData?.user) {
        redirect("/login");
      }
      const todos = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userData.user.id);

      if (!storeRef.current) return;
      storeRef.current.dispatch(initializeTodos({ todos: todos.data }));
    };
    getTodos();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
