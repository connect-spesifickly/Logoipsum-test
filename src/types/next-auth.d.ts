import "next-auth";
declare module "next-auth" {
  interface User {
    token?: string;
  }
  interface Session {
    token?: string;
  }
}
