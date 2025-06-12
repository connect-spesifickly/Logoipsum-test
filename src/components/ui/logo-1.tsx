import Image from "next/image";
import * as React from "react";

export function Logo1({ className }: React.ComponentProps<"input">) {
  return (
    <div>
      <Image
        width={100}
        height={100}
        className={`${className}`}
        src="/Frame.png"
        alt="Logo1"
      ></Image>
    </div>
  );
}
