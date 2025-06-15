import { Logo2 } from "@/components/ui/logo-2";
import { PageType } from "@/lib/interfaces/page-type";
import * as React from "react";
import { useState, useEffect } from "react";

interface SidebarProps {
  activePage: PageType;
  onPageChange: (page: PageType) => void;
}
export function SidebarPage({ activePage, onPageChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const isMdOrLarger = window.innerWidth >= 768;
      if (!isMdOrLarger) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const sidebarItems: { id: PageType; label: string; icon: string }[] = [
    { id: "profile", label: "Profile", icon: "user-circle" },
    { id: "password", label: "Password", icon: "lock-closed" },
    { id: "verification", label: "Verification", icon: "check-circle" },
  ];
  const getIcon = (icon: string) => {
    switch (icon) {
      case "user-circle":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            ></path>
          </svg>
        );

      case "lock-closed":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        );
      case "check-circle":
        return (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        );
      default:
        return null;
    }
  };
  if (isCollapsed) {
    return null;
  }
  return (
    <div className="pt-[24px] pb-[16px] gap-[16px] hidden h-full w-[267px] border-r bg-blue-600 lg:block">
      {/* SIdebar content */}
      <div className="px-[32px]">
        {" "}
        <Logo2 className="" />
      </div>

      <div className="px-[16px] py-8">
        <nav>
          <ul className="flex flex-col gap-[8px]">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`flex w-full items-center rounded-[6px] gap-[12px] text-[16px] text-white font-medium   py-2 ${
                    activePage === item.id
                      ? "bg-blue-500 "
                      : "text-white hover:bg-blue-500"
                  }`}
                >
                  <span className="ml-[16px] w-[20px] h-[20px]">
                    {getIcon(item.icon)}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SidebarPage;
