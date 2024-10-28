"use client";
import { Button } from "@/components/ui/button";
import { clearTodos } from "@/lib/features/todos/todosSlice";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const handleClick = async function() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      redirect("/login");
    }
    dispatch(clearTodos());
  };
  return (
    <Button onClick={handleClick} variant="outline">
      Logout
    </Button>
  );
};

export default LogoutBtn;
