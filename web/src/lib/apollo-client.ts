import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const API_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL ||
  "https://comics-n-stuff-gql-production.up.railway.app/graphql";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: API_URL,
    }),
  });
});
