import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
const querystring = require("querystring");

// import { _findUser } from "@/services/authServices";

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  CredentialsProvider({
    async authorize(credentials, _req) {
      const { email, password } = credentials;

      try {
        const { data } = await axios.post(
          process.env.SERVER_URL + "/token",
          querystring.stringify({ username: email, password })
        );

        return data;
      } catch (error) {
        throw new Error(error.response?.data?.detail || error.message);
      }
    },
  }),
];

export const callbacks = (req) => {
  return {
    signIn: async ({ account, profile }) => {
      if (account.provider === "google") {
        console.log("Google Sign In", profile);

        if (!profile.email_verified) {
          return false;
        }
      }

      return true;
    },

    jwt: async ({ token, user }) => {
      if (req && req.url === "/api/auth/session?update") {
      } else {
        if (user) {
          // token.user = user.profile;
          token.access_token = user.access_token;
        }
      }

      return token;
    },

    session: ({ session, token }) => {
      if (token) {
        // session.user = token.user;
        session.access_token = token.access_token;
      }

      return session;
    },
  };
};

export const authOptions = (req) => ({
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  callbacks: callbacks(req),
  pages: {
    signIn: "#",
    signOut: "#",
    error: "#", // Error code passed in query string as ?error=
  },
});

const handler = (req, res) => NextAuth(req, res, authOptions(req));

export { handler as GET, handler as POST };
