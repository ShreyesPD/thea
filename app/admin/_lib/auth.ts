import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("role, name")
    .eq("id", user.id)
    .single();

  console.log("requireAdmin", {
    user,
    profile,
    error,
  });

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return {
    supabase,
    user,
    profile,
  };
}
