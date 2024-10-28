import LogoutBtn from "@/app/(auth)/_components/logout-btn";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardHeader = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const { data: userData } = await supabase
    .from("profiles")
    .select("username,id")
    .eq("id", data.user.id);

  return (
    <header className="py-6  border-b-[1px] border-b-muted flex gap-4 items-center">
      {userData && userData[0].username}
      <LogoutBtn />
    </header>
  );
};

export default DashboardHeader;
