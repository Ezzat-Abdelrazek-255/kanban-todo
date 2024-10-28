import LogoutBtn from "@/app/(auth)/_components/logout-btn";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

// Server Component for handling authentication and displaying user info in header
const DashboardHeader = async () => {
  // Initialize Supabase client for server-side data fetching
  const supabase = await createClient();

  // Verify user authentication status
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  // Fetch user profile data using the authenticated user's ID
  const { data: userData } = await supabase
    .from("profiles")
    .select("username,id")
    .eq("id", data.user.id);

  return (
    <header className="py-6  border-b-[1px] border-b-muted flex gap-4 items-center">
      {/* Display username and logout button */}
      {userData && userData[0].username}
      <LogoutBtn />
    </header>
  );
};

export default DashboardHeader;
