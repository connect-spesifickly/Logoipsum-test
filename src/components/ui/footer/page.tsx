import * as React from "react";
import { Logo2 } from "../logo-2";
import { Copyright } from "lucide-react";
export function Footer() {
  return (
    <div className="bg-[rgba(37,99,235,0.86)] justify-center items-center h-[100px] w-full flex sm:flex-row flex-col sm:gap-[16px] gap-[8px]">
      <Logo2 className="!sm:w-[133.4px] !sm:h-[24px] !w-[122px] !h-[22px]" />
      <p className="flex items-center text-sm sm:text-[16px] text-[14px] font-normal text-white">
        {" "}
        <Copyright className="h-[20px] scale-75 " /> 2025 Blog genzet. All right
        reserved.
      </p>
    </div>
  );
}
