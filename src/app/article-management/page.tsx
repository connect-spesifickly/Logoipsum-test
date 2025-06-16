"use client";
import { CategoryDropdown } from "@/components/category-dropdown";
import { Navbar } from "@/components/ui/navbar/main-navbar";
import * as React from "react";
import { Category } from "../_components/searchbar";
import { api } from "@/utils/axios";
import { Search } from "lucide-react";

export default function Main() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [mounted, setMounted] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({
    title: "",
    category: "",
    page: "",
  });
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {
        title: urlParams.get("title") || "",
        category: urlParams.get("category") || "",
        page: urlParams.get("page") || "1",
      };
      setSearchParams(params);
      setSearchInput(params.title);
    }
  }, []);

  const updateSearchParams = (key: string, value: string) => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    if (value) {
      urlParams.set(key, value);
    } else {
      urlParams.delete(key);
    }

    if (key !== "page") {
      urlParams.set("page", "1");
    }
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, "", newUrl);

    setSearchParams({
      title: urlParams.get("title") || "",
      category: urlParams.get("category") || "",
      page: urlParams.get("page") || "1",
    });
  };

  const onSearch = React.useCallback((searchTerm: string) => {
    updateSearchParams("title", searchTerm);
  }, []);

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
    if (!mounted) return;
    const timer = setTimeout(() => {
      if (searchInput !== searchParams.title) {
        if (searchInput !== undefined) {
          onSearch(searchInput);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [mounted, onSearch, searchInput, searchParams.title]);

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
                  currentCategory={searchParams.category}
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
