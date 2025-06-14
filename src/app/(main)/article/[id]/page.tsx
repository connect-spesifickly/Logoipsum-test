"use client";
import ArticleCard from "@/components/ui/article-card/page";
import {
  ArticleDetail,
  ArticlesResponse,
  IArticleCard,
} from "@/lib/interfaces/articles-interfaces";
import { api } from "@/utils/axios";
import dateFormat from "@/utils/date-format";
import Image from "next/image";
import { useParams } from "next/navigation";
import * as React from "react";

export default function Article() {
  const [article, setArticle] = React.useState<ArticleDetail>();
  const [articles, setArticles] = React.useState<ArticlesResponse[]>();

  const params = useParams<{ id: string }>();
  const id = params.id;
  React.useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/articles/${id} `);
        console.log("ini response", response);
        const articlesData = response.data as ArticleDetail;
        console.log(articlesData);
        setArticle(articlesData);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticle();
  }, [id]);

  React.useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/articles", {
          params: {
            category: article?.category.id,
            limit: 3,
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
  }, [article]);

  return (
    <div>
      <div className="sm:px-[160px] py-[40px] w-full px-[20px] flex flex-col sm:gap-[40px] gap-[24px]">
        <div className="flex flex-col gap-[16px] items-center">
          <div className="flex gap-[4px] text-[14px] text-slate-600 font-medium text-sm">
            <p>{dateFormat(article?.createdAt as string)}</p>
            <p>·</p>
            <p>Created by {article?.user.username}</p>
          </div>
          <h2 className="text-[30px] font-semibold text-3xl text-slate-900 text-center">
            {article?.title}
          </h2>
        </div>
        <div className="flex justify-center w-full">
          <div className="relative group sm:max-w-[1120px] sm:max-h-[480px] max-h-[240px] max-w-[355px]">
            <Image
              src={article?.imageUrl || "/no-image.jpg"}
              alt="Article Image"
              width={100}
              height={100}
              className="rounded-[12px] sm:h-[480px] sm:w-[1120px] h-[240px] w-[355px]  "
            />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: article?.content || "",
          }}
          className="text-justify text-slate-700 text-[16px]"
        />
      </div>
      <div className="items-center justify-center sm:px-[180px] pt-[40px] sm:pb-[100px] px-[20px] pb-[60px] w-full flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[24px]">
          <h3 className="text-[18px] text-slate-900 font-bold text-lg">
            Our articles
          </h3>
          <div className="flex sm:flex-row flex-col sm:gap-[40px] gap-[24px]">
            <div className="grid w-full grid-cols-1 sm:gap-y-[60px] gap-y-[40px] gap-x-[40px] md:grid-cols-2 lg:grid-cols-3 ">
              {articles &&
                articles[0]?.data.map((article: IArticleCard) => (
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
          </div>
        </div>
      </div>
    </div>
  );
}
