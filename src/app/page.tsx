"use client";

import { Navbar } from "@/components/ui/navbar/page";

import Image from "next/image";
import Searchbar from "./_components/searchbar";

export default function Home() {
  return (
    <div className="h-[2000px]">
      <Navbar className="sm:hidden block" />
      <Image
        width={100}
        height={100}
        src="/homepage-background.jpg"
        alt="Homepage Background"
        className="w-full sm:h-[500px] h-[560px] object-cover absolute"
      />
      <div className="relative bg-[rgba(37,99,235,0.86)] sm:h-[500px] h-[560px] flex flex-col items-center">
        <Navbar location="homepage" className="text-white" />

        <div className="sm:px-[60px] px-[20px] w-full flex items-center justify-center sm:mt-[42.5px] ">
          <div className="w-full max-w-[730px] sm:h-[276px] h-[380px] flex-col flex gap-[40px] items-center  mt-[117px] sm:mt-0">
            <div className="flex-col flex gap-[12px] items-center text-white">
              <p className="font-bold sm:text-[16px] text-[14px]">
                Blog genzet
              </p>
              <p className="leading-none font-medium text-[36px] sm:text-[48px] text-center ">
                The Journal : Design Resources, Interviews, and Industry News
              </p>
              <p className="sm:text-[24px] text-[20px] text-center font-normal">
                Your daily does of design insights!
              </p>
            </div>
            <div className="h-[10px]  w-full sm:max-w-[608px]">
              <Searchbar></Searchbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
