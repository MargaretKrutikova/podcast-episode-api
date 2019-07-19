import express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import axios from "axios"
import "./env"

const typeDefs = gql`
  type Episode {
    id: String
    websiteUrl: String
  }
  type Query {
    episode(podcastId: String!, episodeName: String!): Episode
  }
`

type EpisodeParams = {
  podcastId: string
  episodeName: string
}

type EpisodeData = {
  id: string
  attributes: {
    name: string
    websiteUrl: string
  }
}

type PodcastData = {
  data: EpisodeData[]
}

const getEpisodeApiUrl = (podcastId: string) =>
  `${process.env.API_URL}/v1/catalog/us/podcasts/${podcastId}/episodes?offset=0&limit=300`

const resolvers = {
  Query: {
    episode: async (_: any, { podcastId, episodeName }: EpisodeParams) => {
      const url = getEpisodeApiUrl(podcastId)
      const { data: response } = await axios.get<PodcastData>(url, {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`
        }
      })

      const episode = response.data.find(
        ep =>
          ep.attributes.name.toLowerCase() === episodeName.toLocaleLowerCase()
      )
      return episode
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
