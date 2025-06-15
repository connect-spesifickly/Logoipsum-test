"use client";

import { Navbar } from "@/components/ui/navbar/main-navbar";

import Image from "next/image";
import Searchbar from "./_components/searchbar";
import { api } from "@/utils/axios";
import React from "react";
import {
  ArticlesResponse,
  IArticleCard,
} from "@/lib/interfaces/articles-interfaces";
import ArticleCard from "@/components/ui/article-card/page";
import ArticlesPagination from "./_components/articles-pagination";
import { Footer } from "@/components/ui/footer/page";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [articles, setArticles] = React.useState<ArticlesResponse[]>();

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const currentCategory = searchParams.get("category") || "";
  const currentTitle = searchParams.get("title") || "";

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/articles", {
          params: {
            page: currentPage,
            category: currentCategory !== "all" ? currentCategory : "",
            title: currentTitle,
            limit: 9,
          },
        });
        console.log("ini response", response);
        const articlesData = response.data as ArticlesResponse;
        console.log(articlesData);
        setArticles([articlesData]);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, [currentCategory, currentPage, currentTitle]);

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

  const handleSearch = (searchTerm: string) => {
    updateSeacrchParams("title", searchTerm);
  };

  const handlePageChange = (page: string) => {
    updateSeacrchParams("page", page.toString());
  };
  return (
    <div className="h-fit">
      <Navbar className="sm:hidden block" />
      <Image
        width={100}
        height={100}
        src="/homepage-background.jpg"
        alt="Homepage Background"
        className="w-full sm:h-[500px] h-[560px] object-cover absolute"
      />
      <div className="relative bg-[rgba(37,99,235,0.86)] sm:h-[500px] h-[560px] flex flex-col items-center">
        <Navbar location="homepage" className="text-white" />

        <div className="sm:px-[60px] px-[20px] w-full flex items-center justify-center sm:mt-[42.5px] ">
          <div className="w-full max-w-[730px] sm:h-[276px] h-[380px] flex-col flex gap-[40px] items-center  mt-[117px] sm:mt-0">
            <div className="flex-col flex gap-[12px] items-center text-white">
              <p className="font-bold sm:text-[16px] text-[14px]">
                Blog genzet
              </p>
              <p className="leading-none font-medium text-[36px] sm:text-[48px] text-center ">
                The Journal : Design Resources, Interviews, and Industry News
              </p>
              <p className="sm:text-[24px] text-[20px] text-center font-normal">
                Your daily does of design insights!
              </p>
            </div>
            <div className="h-[10px]  w-full sm:max-w-[608px]">
              <Searchbar
                onSearch={handleSearch}
                defaultValue={currentTitle}
              ></Searchbar>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full  pt-[40px] sm:pb-[100px] sm:px-[100px] px-[20px] pb-[60px] flex-col items-center justify-center flex">
        <div className=" ">
          {articles !== undefined ? (
            <div className="flex flex-col gap-[24px]">
              <div className="hidden sm:block text-base text-[16px] font-medium text-slate-600 w-full">
                Showing :{" "}
                {articles[0].limit <= articles[0].total
                  ? articles[0].limit *
                      (articles[0].page == 1 ? 1 : articles[0].page - 1) +
                    (articles[0].page == 1
                      ? 0
                      : articles[0].total % articles[0].limit)
                  : articles[0].total}{" "}
                of {articles[0].total} articles
              </div>
              <div className="grid w-full grid-cols-1 sm:gap-y-[60px] gap-y-[40px] gap-x-[40px] md:grid-cols-2 lg:grid-cols-3 ">
                {articles[0].data.map((article: IArticleCard) => (
                  <ArticleCard
                    key={article.id}
                    id={article.id}
                    imageUrl={article.imageUrl}
                    title={article?.title}
                    content={article?.content}
                    createdAt={article?.createdAt}
                    category={article?.category}
                  />
                ))}
              </div>
              {articles[0].total ? (
                <ArticlesPagination
                  currentPage={articles[0].page}
                  totalPage={Math.ceil(articles[0].total / articles[0].limit)}
                  hasPreviousPage={articles[0].page > 1}
                  hasNextPage={
                    articles[0].page <
                    Math.ceil(articles[0].total / articles[0].limit)
                  }
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className=""></div>
              )}
            </div>
          ) : (
            <div className="py-40 text-center">
              <p>No articles found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
