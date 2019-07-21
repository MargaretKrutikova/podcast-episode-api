import express from "express"
import { ApolloServer } from "apollo-server-express"
import { typeDefs } from "./schema"
import {
  Resolvers,
  QuerySearchEpisodesArgs,
  QuerySearchPodcastsArgs,
  QueryGetPodcastByIdArgs
} from "./generated/graphql"
import { getItunesEpisode, ItunesEpisodeQuery } from "./itunesApi"
import {
  getEpisodeSearchResults,
  getPodcastSearchResults,
  getPodcastById
} from "./listenNotesApi"

import "./env"

const resolvers: Resolvers = {
  Query: {
    itunesEpisode: (_: any, params: ItunesEpisodeQuery) =>
      getItunesEpisode(params),
    searchEpisodes: (_: any, params: QuerySearchEpisodesArgs) =>
      getEpisodeSearchResults(params.input, params.episodeInput),
    searchPodcasts: (_: any, params: QuerySearchPodcastsArgs) =>
      getPodcastSearchResults(params.input),
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
