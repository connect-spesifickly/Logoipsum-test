"use client";
import { Button } from "@/components/ui/button";
import { UserData } from "@/lib/interfaces/user-interface";
import { api } from "@/utils/axios";
import dateFormat from "@/utils/date-format";
import { useSession } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

export default function Profile() {
  const { data: session } = useSession();
  const [userData, setUserData] = React.useState<UserData>();
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
        });
        const data = response.data;
        console.log("ini data:", data);
        setUserData(data as UserData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (session?.token) {
      fetchProfile();
    }
  }, [session?.token]);
  return (
    <div className="flex items-center justify-center w-full sm:h-[667px]  h-[604px] py-[40px] sm:px-[160px] px-[20px]">
      <div className="py-[24px] px-[16px]  h-[436px] max-w-[400px] w-full flex flex-col gap-[36px] ">
        <h4 className="w-full text-center text-[20px] font-semibold text-slate-900">
          User Profile
        </h4>
        <div className="flex flex-col gap-[24px] items-center">
          <div className="flex items-center justify-center w-[68px] h-[68px] rounded-full bg-blue-200 text-blue-900 focus:outline-none">
            {userData?.username.charAt(0).toUpperCase()}
          </div>
          <div className="text-[16px] text-gray-900 flex flex-col gap-[12px] w-full">
            <div className="h-[44px] rounded-[6px] py-[10px] px-[12px] bg-slate-200 flex justify-between">
              <div className="font-semibold flex gap-[16px] w-[97px]">
                <div className="w-[76px]">Username</div>
                <div className="">:</div>
              </div>
              <div className="max-w-[210px] w-full text-center">
                {userData?.username}
              </div>
            </div>
            <div className="h-[44px] rounded-[6px] py-[10px] px-[12px] bg-slate-200 flex justify-between">
              <div className="font-semibold flex gap-[16px] w-[97px]">
                <div className="w-[75px]">Created</div>
                <div className="">:</div>
              </div>
              <div className="max-w-[210px] w-full text-center">
                {dateFormat(userData?.createdAt as string)}
              </div>
            </div>
            <div className="h-[44px] rounded-[6px] py-[10px] px-[12px] bg-slate-200 flex justify-between">
              <div className="font-semibold flex gap-[16px] w-[97px]">
                <div className="w-[75px]">Role</div>
                <div className="">:</div>
              </div>
              <div className="max-w-[210px] w-full text-center">
                {userData?.role}
              </div>
            </div>
          </div>
        </div>
        <Button className="text-[14px] font-medium text-slate-50">
          <Link href="/" className="w-full h-full">
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
