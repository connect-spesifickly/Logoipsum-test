import axios from "axios";
export const api = axios.create({
  baseURL: "https://test-fe.mysellerpintar.com/api",
});
