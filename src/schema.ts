import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Episode {
    id: String!
    listennotesUrl: String!
    lengthSec: Int!
    rss: String!
    description: String!
    title: String!
    publisher: String!
    image: String!
    thumbnail: String!
    podcastItunesId: Int!
    pubDate: String!
    podcastId: String!
    genreIds: [Int!]!
    podcastTitle: String!
    podcastListennotesUrl: String!
  }
  type Podcast {
    id: String!
    listennotesUrl: String!
    rss: String!
    description: String!
    title: String!
    publisher: String!
    image: String!
    thumbnail: String!
    podcastItunesId: Int!
    latestPubDate: String!
    earliestPubDate: String!
    genreIds: [Int!]!
    totalEpisodes: Int!
  }
  union SearchResult = Episode | Podcast

  type SearchResults {
    count: Int!
    nextOffset: Int!
    total: Int!
    results: [SearchResult!]!
  }

  type ItunesEpisode {
    id: String
    websiteUrl: String
  }
  enum SEARCH_TYPE {
    EPISODE
    PODCAST
  }
  input SearchInput {
    searchType: SEARCH_TYPE!
    language: String
    genreIds: [Int!]
    searchTerm: String!
    offset: Int!
    podcastId: String
    excludePodcastId: String
  }
  type Query {
    itunesEpisode(podcastId: String!, episodeName: String!): ItunesEpisode!
    search(input: SearchInput!): SearchResults!
    getPodcastById(podcastId: String!): Podcast
    getEpisodesByIds(ids: [String!]!): [Episode!]!
    getPodcastsByIds(ids: [String!]!): [Podcast!]!
  }
`
