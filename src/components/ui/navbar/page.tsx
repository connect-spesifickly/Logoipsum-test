"use client";
import * as React from "react";
import { Logo2 } from "../logo-2";
import { useSession } from "next-auth/react";
import { api } from "@/utils/axios";
import { Logo1 } from "../logo-1";

const Navbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { location?: string }
>(({ className, location }, ref) => {
  const { data: session } = useSession();
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        const data = response.data as { username: string };
        setUsername(data.username);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (session?.token) {
      fetchProfile();
    }
  }, [session?.token]);

  return (
    <div
      className={`${className} flex justify-between items-center w-full sm:h-[96px] h-[64px] sm:py-[32px] sm:px-[60px] py-[16px] px-[20px] ${
        location == "homepage" ? "bg-transparent sm:flex hidden" : ""
      }`}
      ref={ref}
    >
      {location == "homepage" ? <Logo2 /> : <Logo1 />}
      <div className="flex gap-[6px] items-center justify-center">
        <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-blue-200 text-blue-900">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="sm:block hidden  text-[16px] underline">{username}</div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
