export interface IArticleCard {
  id: string;
  imageUrl: string;
  title: string;
  content: string;
  createAt: string;
  category: { name: string };
}

export interface ArticlesResponse {
  data: IArticleCard;
  limit: number;
  page: number;
  total: number;
}
