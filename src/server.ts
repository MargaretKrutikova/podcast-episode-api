import express from "express"
import { ApolloServer } from "apollo-server-express"
import { typeDefs } from "./schema"
import { SearchInput, Resolvers } from "./generated/graphql"
import { getItunesEpisode, ItunesEpisodeQuery } from "./itunesApi"
import { getEpisodeSearchResults } from "./listenNotesApi"

import "./env"

const resolvers: Resolvers = {
  Query: {
    itunesEpisode: (_: any, params: ItunesEpisodeQuery) =>
      getItunesEpisode(params),
    searchEpisodes: (_: any, params: { input: SearchInput }) =>
      getEpisodeSearchResults(params.input)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  introspection: true,
  playground: true
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log("🚀 Server ready at http://localhost:4000")
)

export default app
