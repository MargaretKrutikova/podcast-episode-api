import express from "express"
import { ApolloServer } from "apollo-server-express"
import { typeDefs } from "./schema"
import {
  Resolvers,
  QuerySearchArgs,
  QueryGetPodcastByIdArgs,
  Episode,
  Podcast
} from "./generated/graphql"
import { getItunesEpisode, ItunesEpisodeQuery } from "./itunesApi"
import { getPodcastById, getSearchResults } from "./listenNotesApi"

import "./env"

const resolvers: Resolvers = {
  SearchResult: {
    __resolveType(obj) {
      if ((obj as Episode).podcastId) {
        return "Episode"
      }

      if ((obj as Podcast).totalEpisodes != undefined) {
        return "Podcast"
      }

      return null
    }
  },
  Query: {
    itunesEpisode: (_: any, params: ItunesEpisodeQuery) =>
      getItunesEpisode(params),
    search: (_: any, params: QuerySearchArgs) => getSearchResults(params.input),
    getPodcastById: (_: any, params: QueryGetPodcastByIdArgs) =>
      getPodcastById(params.podcastId)
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
