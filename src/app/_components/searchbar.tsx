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
import { Input } from "@/components/ui/input";

export default function Searchbar() {
  return (
    <div className="bg-blue-500 rounded-[12px] w-full p-[10px] gap-[8px] flex sm:flex-row flex-col">
      <div className="sm:w-fit w-full">
        <Select>
          <SelectTrigger className="sm:w-[180px] text-[14px] w-full bg-white rounded-md text-gray-900  outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <Input
          type="text"
          placeholder="Search articles"
          className="text-[14px] w-full bg-white rounded-md text-gray-900  outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
