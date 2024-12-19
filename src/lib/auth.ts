import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

//import { signInSchema } from "./zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    Credentials({
      credentials: {
        Email: {},
        Password: {},
      },
      authorize: async (credentials) => {
        //const { email, password } = await signInSchema.parseAsync(credentials);
        const { Email, Password } = credentials;
        console.debug("formdata");
        console.debug("email" + Email + " Password" + Password);

        //const pwHash = saltAndHashPassword(password);

        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          mode: "cors",
          cache: "no-store",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Email: Email, Password: Password }),
        });

        if (!res.ok) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.");
        }

        const jsondata = await res.json();
        console.debug("json data");
        console.debug(jsondata);
        return jsondata;
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      // `session.user.address` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return {
        ...session,
        user: {
          ...session.user,
        },
        token: token,
      };
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});
