import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type EpisodeSearchResult {
    listennotesId: String!
    listennotesUrl: String!
    lengthSec: Int
    rss: String!
    description: String!
    title: String!
    publisher: String!
    image: String
    thumbnail: String
    podcastItunesId: Int!
    pubDateMs: Int
    podcastListennotesId: String!
    genreIds: [Int]!
    podcastTitle: String!
    podcastListennotesUrl: String
  }
  type EpisodeSearchResults {
    count: Int!
    nextOffset: Int!
    total: Int!
    results: [EpisodeSearchResult]!
  }
  type ItunesEpisode {
    id: String
    websiteUrl: String
  }
  input SearchInput {
    term: String!
    genreIds: [Int]
  }
  type Query {
    itunesEpisode(podcastId: String!, episodeName: String!): ItunesEpisode
    searchEpisodes(input: SearchInput!): EpisodeSearchResults
  }
`
