import * as React from "react";

import { Search } from "lucide-react";
import { api } from "@/utils/axios";
import { CategoryDropdown } from "@/components/category-dropdown";

export interface Category {
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
  const [mounted, setMounted] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setCurrentCategory(urlParams.get("category") || "");
    }
  }, []);

  const updateSearchParams = (key: string, value: string) => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1");
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    setCurrentCategory(params.get("category") || "");
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

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-500 rounded-[12px] w-full p-[10px] gap-[8px] flex sm:flex-row flex-col">
      <div className="sm:w-fit w-full h-[40px]">
        <CategoryDropdown
          currentCategory={currentCategory}
          handleCategoryChange={handleCategoryChange}
          categories={categories}
        />
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
