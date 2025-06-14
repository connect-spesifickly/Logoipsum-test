"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { cn } from '@/lib/utils';

import { IArticleCard } from "@/lib/interfaces/articles-interfaces";
import dateFormat from "@/utils/date-format";

// import { MdOutlineWork } from 'react-icons/md';

export default function ArticleCard({
  id,
  imageUrl,
  title,
  content,
  createdAt,
  category,
}: IArticleCard) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const cleanContent = content?.replace(/<[^>]*>/g, "") || "";

  return (
    <div className="relative group sm:max-w-[386.67px] max-w-[345px]">
      <Link href={`/article/${id}`} className="">
        <div className="flex flex-col gap-[16px]">
          <div className="w-full max-w-full">
            <Image
              src={imageUrl || "/no-image.jpg"}
              alt="Article Image"
              width={100}
              height={100}
              className="rounded-[12px] sm:h-[240px] sm:w-[386.67px] h-[200px] w-[345px]  "
            />
          </div>
          <div className="flex-col flex gap-[8px]">
            <span className="text-slate-600 text-[14px] font-normal">
              {dateFormat(createdAt)}
            </span>

            <h2 className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[18px] text-slate-900 font-semibold">
              {title}
            </h2>
            <p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-normal text-slate-600">
              {" "}
              {cleanContent}
            </p>
            <p className="py-[4px] px-[12px] rounded-[100px] bg-blue-200 w-fit text-[14px] font-normal text-blue-900 text-sm">
              {category.name}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
