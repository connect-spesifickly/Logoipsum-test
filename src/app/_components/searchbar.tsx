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
import { Search } from "lucide-react";
import { api } from "@/utils/axios";
interface Category {
  id: number;
  name: string;
}

export default function Searchbar() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories?limit=100");
        const categoriesData = response.data as { data: Category[] };

        setCategories(categoriesData.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="bg-blue-500 rounded-[12px] w-full p-[10px] gap-[8px] flex sm:flex-row flex-col">
      <div className="sm:w-fit w-full h-[40px]">
        <Select>
          <SelectTrigger className="min-h-[40px] sm:w-[180px] text-[14px] w-full bg-white rounded-md text-gray-900  outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent side="bottom" avoidCollisions={false} sideOffset={2}>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem value={category.name} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" w-full  rounded-[6px] ">
        <div
          className={`relative  border-primary-gray rounded-[6px] border-slate-200`}
        >
          <div className="bg-white rounded-[6px] px-[12px] py-[8px] flex h-[40px] gap-[6px] items-center justify-center">
            <Search size={20} className={`text-slate-400 w-fit  `} />
            <input
              type="text"
              ref={undefined}
              className={`relative text-[14px] w-full bg-white rounded-[6px] text-gray-900  outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0   font-medium focus:border-[0px] `}
              placeholder={"Search articles"}
              id={"search"}
              name={"search"}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
