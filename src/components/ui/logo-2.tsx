import Image from "next/image";
import * as React from "react";

export function Logo2({ className }: React.ComponentProps<"input">) {
  return (
    <div>
      <Image
        width={100}
        height={100}
        className={`${className} w-[134px] h-[24px]`}
        src="/Frame2.png"
        alt="Logo2"
      ></Image>
    </div>
  );
}
