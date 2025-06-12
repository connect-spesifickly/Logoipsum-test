import Image from "next/image";
import * as React from "react";

export function Logo1({ className }: React.ComponentProps<"input">) {
  return (
    <div>
      <Image
        width={100}
        height={100}
        className={`${className} w-[122px] h-[22px] sm:w-[134px] sm:h-[24px]`}
        src="/Frame.png"
        alt="Logo1"
      ></Image>
    </div>
  );
}
