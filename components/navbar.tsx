"use client";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

export default function Navbar() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { data, error, status } = await supabase
        .from("users")
        .select(`full_name, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        console.log(data);
        setFullName(data.full_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch {
      console.error("ERROR GETTING USER");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <nav className="fixed inline-flex flex-row justify-between w-full top-0 p-5">
      <div className="text-3xl">Karaoke</div>
      <div className="flex flex-row">
        <div className="">
          {loading ? <div>Loading...</div> : <div className="">{fullName}</div>}
        </div>
        <Button variant="secondary">
          <Plus /> Create
        </Button>
      </div>
    </nav>
  );
}
