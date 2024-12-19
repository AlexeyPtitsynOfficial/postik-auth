import "next-auth";
import "@auth/core/types";
import "@auth/core";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id?: string;
    UserName?: string;
    Email?: string;
    FirstName?: string;
    LastName?: string;
  }
  interface Session {
    user?: {
      /** The user's postal address. */
      id: string;
      UserName: string;
      Email: string;
      FirstName: string;
      LastName: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
    //token: string & DefaultSession["user"];
  }
}
