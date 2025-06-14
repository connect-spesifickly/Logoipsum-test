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
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
}
export default function Searchbar({
  onSearch,
  defaultValue,
}: {
  onSearch: (searchTerm: string) => void;
  defaultValue?: string;
}) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [searchInput, setSearchInput] = React.useState(defaultValue);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentCategory = searchParams.get("category") || "";

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    updateSearchParams("category", category);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = () => {
    if (searchInput !== undefined) {
      onSearch(searchInput);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== defaultValue) {
        if (searchInput !== undefined) {
          onSearch(searchInput);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [defaultValue, onSearch, searchInput]);

  React.useEffect(() => {
    setSearchInput(defaultValue);
  }, [defaultValue]);

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
        <Select value={currentCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="min-h-[40px] sm:w-[180px] text-[14px] w-full bg-white rounded-md text-gray-900  outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
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
      <div className=" w-full  rounded-[6px] ">
        <div
          className={`relative  border-primary-gray rounded-[6px] border-slate-200`}
        >
          <div className="bg-white rounded-[6px] px-[12px] py-[8px] flex h-[40px] gap-[6px] items-center justify-center">
            <Search size={20} className={`text-slate-400 w-fit  `} />
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInput}
              onKeyPress={handleKeyPress}
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
