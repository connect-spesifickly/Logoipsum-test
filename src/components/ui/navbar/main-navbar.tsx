"use client";
import * as React from "react";
import { Logo2 } from "../logo-2";
import { useSession } from "next-auth/react";
import { api } from "@/utils/axios";
import { Logo1 } from "../logo-1";

import { LogOut } from "lucide-react";
import Link from "next/link";
import DialogLogout from "./_components/dialog";
const Navbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { location?: string }
>(({ className, location }, ref) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
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
      {location == "homepage" ? (
        <Logo2 />
      ) : location == "articles-management" ? (
        <div className="text-slate-900 text-[20px] font-semibold text-xl">
          Articles
        </div>
      ) : location == "category-management" ? (
        <div className="text-slate-900 text-[20px] font-semibold text-xl">
          Category
        </div>
      ) : (
        <Logo1 />
      )}
      <div className="flex gap-[6px] items-center justify-center">
        <>
          {isOpen && (
            <div
              className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-40"
              onClick={() => setIsOpen(false)}
            />
          )}

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-blue-200 text-blue-900 focus:outline-none"
            >
              {username.charAt(0).toUpperCase()}
            </button>
            {isOpen && (
              <div className="border-slate-200 border-[1px] absolute right-[-50px] mt-2 text-[14px] p-[5px] w-[224px]  rounded-[6px] bg-white shadow-lg  z-50">
                <div className="py-[6px] px-[8px] font-normal text-slate-600 hover:bg-transparent cursor-pointer">
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    My Account
                  </Link>
                </div>

                <div className="bg-slate-200 h-[1px] my-1"></div>

                <div className="py-[6px] px-[8px] gap-[8px] font-medium text-red flex items-center hover:bg-transparent cursor-pointer">
                  <LogOut className="text-red-500 w-4 h-4" />
                  <div
                    className="text-red-500 text-left hover:bg-transparent w-full"
                    onClick={() => {
                      setIsDialogOpen(true);
                      setIsOpen(false);
                    }}
                  >
                    Log Out
                  </div>
                </div>
              </div>
            )}
            {isDialogOpen && (
              <DialogLogout
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
          </div>
        </>
        <div className="sm:block hidden  text-[16px] underline">{username}</div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
