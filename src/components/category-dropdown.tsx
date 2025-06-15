import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/app/_components/searchbar";

interface CategoryDropdownProps {
  currentCategory: string;
  handleCategoryChange: (value: string) => void;
  categories: Category[];
  className?: string;
}

export function CategoryDropdown({
  className,
  currentCategory,
  handleCategoryChange,
  categories,
}: CategoryDropdownProps) {
  return (
    <div>
      <Select value={currentCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger
          className={`min-h-[40px] sm:w-[180px] text-[14px] w-full bg-white rounded-md text-gray-900 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${className}`}
        >
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent side="bottom" avoidCollisions={false} sideOffset={2}>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value={"all"}>All</SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id.toString() || " "}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
