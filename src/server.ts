import express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import axios from "axios"
import { NowRequest, NowResponse } from "@now/node"

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

type Episode = {
  id: string | null
  websiteUrl: string | null
}

const toReturnEpisode = ({ id, attributes }: EpisodeData) => ({
  id,
  websiteUrl: attributes ? attributes.websiteUrl : ""
})

const getEpisodeApiUrl = (podcastId: string) =>
  `${process.env.API_URL}/v1/catalog/us/podcasts/${podcastId}/episodes?offset=0&limit=300`

const getEpisode = async ({ episodeName, podcastId }: EpisodeParams) => {
  const url = getEpisodeApiUrl(podcastId)
  const { data: response } = await axios.get<PodcastData>(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })

  const episode = response.data.find(
    ep => ep.attributes.name.toLowerCase() === episodeName.toLocaleLowerCase()
  )
  const data: Episode = episode
    ? toReturnEpisode(episode)
    : { id: null, websiteUrl: null }

  return data
}

const resolvers = {
  Query: {
    episode: (_: any, params: EpisodeParams) => getEpisode(params)
  }
}

const apiEpisode = async (req: NowRequest, res: NowResponse) => {
  const params: EpisodeParams = {
    podcastId: req.query.podcastId as string,
    episodeName: req.query.episodeName as string
  }

  try {
    const episode = await getEpisode(params)
    return res.send(episode)
  } catch (e) {
    return res.send({ id: null, websiteUrl: "" } as Episode)
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
})

const app = express()
server.applyMiddleware({ app })

app.get("/", apiEpisode)

app.listen({ port: 4000 }, () =>
  console.log("🚀 Server ready at http://localhost:4000")
)

export default app
