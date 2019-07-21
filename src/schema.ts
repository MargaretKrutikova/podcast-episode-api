import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type EpisodeSearchResult {
    listennotesId: String!
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
    podcastListennotesId: String!
    genreIds: [Int!]!
    podcastTitle: String!
    podcastListennotesUrl: String!
  }
  type PodcastSearchResult {
    listennotesId: String!
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
  type EpisodeSearchResults {
    count: Int!
    nextOffset: Int!
    total: Int!
    results: [EpisodeSearchResult!]!
  }
  type PodcastSearchResults {
    count: Int!
    nextOffset: Int!
    total: Int!
    results: [PodcastSearchResult]!
  }
  type ItunesEpisode {
    id: String
    websiteUrl: String
  }
  input BaseSearchInput {
    language: String
    genreIds: [Int!]
    searchTerm: String!
    offset: Int!
  }
  input EpisodeSearchInput {
    podcastId: String
    excludePodcastId: String
  }
  type Query {
    itunesEpisode(podcastId: String!, episodeName: String!): ItunesEpisode!
    searchEpisodes(
      input: BaseSearchInput!
      episodeInput: EpisodeSearchInput
    ): EpisodeSearchResults!
    searchPodcasts(input: BaseSearchInput!): PodcastSearchResults!
    getPodcastById(podcastId: String!): PodcastSearchResult
  }
`
