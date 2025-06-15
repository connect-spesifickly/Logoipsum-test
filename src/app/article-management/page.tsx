"use client";
import { CategoryDropdown } from "@/components/category-dropdown";
import { Navbar } from "@/components/ui/navbar/main-navbar";
import * as React from "react";
import { Category } from "../_components/searchbar";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/utils/axios";
import { Search } from "lucide-react";

export default function Main() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("title") || "";
  const [searchInput, setSearchInput] = React.useState(defaultValue);

  const router = useRouter();
  const currentCategory = searchParams.get("category") || "";

  const updateSeacrchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  const onSearch = React.useCallback((searchTerm: string) => {
    updateSeacrchParams("title", searchTerm);
  }, []);

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
    <div>
      {" "}
      <Navbar
        location="articles-management"
        className="!pt-[20px] !pb-[16px] !px-[24px] border-b-[1px] border-slate-200 !h-[68px]"
      />
      <div className="pt-[24px] px-[24px]">
        <div className="border-slate-200 rounded-[12px] border-[1px] w-full h-[1132px] flex-col flex">
          <div className="border-b-[1px] rounded-t-[12px] p-[24px] gap-[10px] bg-gray-50 border-slate-200 h-[72px]">
            <p className="text-[16px] font-medium text-slate-800">
              Total Articles : {}
            </p>
          </div>
          <div className="flex items-center border-b-[1px]  p-[24px] gap-[10px] bg-gray-50 border-slate-200 h-[88px]">
            <p className="flex text-[16px] font-medium text-slate-800">
              <div className="">
                <CategoryDropdown
                  className=""
                  currentCategory={currentCategory}
                  handleCategoryChange={handleCategoryChange}
                  categories={categories}
                />
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
              <div className=""></div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
