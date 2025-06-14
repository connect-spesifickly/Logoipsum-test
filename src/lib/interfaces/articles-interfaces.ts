export interface IArticleCard {
  id: string;
  imageUrl: string;
  title: string;
  content: string;
  createdAt: string;
  category: { name: string };
}

export interface ArticlesResponse {
  data: IArticleCard[];
  limit: number;
  page: number;
  total: number;
}

export interface Pagination {
  currentPage: number;
  totalPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ArticleDetail {
  title: string;
  createdAt: string;
  user: { username: string };
  imageUrl: string;
  category: { id: string };
  content: string;
}
