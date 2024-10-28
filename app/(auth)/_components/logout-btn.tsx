"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import React from "react";

const LogoutBtn = () => {
  const handleClick = async function() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      redirect("/login");
    }
  };
  return (
    <Button onClick={handleClick} variant="outline">
      Logout
    </Button>
  );
};

export default LogoutBtn;
