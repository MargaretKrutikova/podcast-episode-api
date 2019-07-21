import { EpisodeSearchResult, PodcastSearchResult } from "./generated/graphql"

export type ListennotesPodcastSearchResult = {
  rss: string
  description_highlighted: string
  description_original: string
  title_highlighted: string
  title_original: string
  publisher_highlighted: string
  publisher_original: string
  image: string
  thumbnail: string
  itunes_id: number
  latest_pub_date_ms: number
  earliest_pub_date_ms: number
  id: string
  genre_ids: number[]
  listennotes_url: string
  total_episodes: number
}

export type ListennotesEpisodeSearchResult = {
  audio_length_sec: number
  rss: string
  description_original: string
  title_original: string
  podcast_title_original: string
  publisher_original: string
  image: string
  thumbnail: string
  itunes_id: number
  pub_date_ms: number
  id: string
  podcast_id: string
  genre_ids: number[]
  listennotes_url: string
  podcast_listennotes_url: string
  explicit_content: boolean
}

const truncateDescription = (desc: string) => desc.slice(0, 200)

const isValidDate = (d: Date) => d instanceof Date && !isNaN(d as any)

const convertToDate = (ms: number) => {
  const date = new Date(ms)
  return isValidDate(date) ? date.toLocaleDateString() : ""
}

export const toEpisodeSearchResult = (
  episode: ListennotesEpisodeSearchResult
): EpisodeSearchResult => ({
  listennotesId: episode.id,
  listennotesUrl: episode.listennotes_url,
  lengthSec: episode.audio_length_sec,
  rss: episode.rss,
  description: truncateDescription(episode.description_original),
  title: episode.title_original,
  publisher: episode.publisher_original,
  image: episode.image,
  thumbnail: episode.thumbnail,
  podcastItunesId: episode.itunes_id,
  pubDate: convertToDate(episode.pub_date_ms),
  podcastListennotesId: episode.podcast_id,
  genreIds: episode.genre_ids,
  podcastTitle: episode.podcast_title_original,
  podcastListennotesUrl: episode.podcast_listennotes_url
})

export const toPodcastSearchResult = (
  podcast: ListennotesPodcastSearchResult
): PodcastSearchResult => ({
  listennotesId: podcast.id,
  listennotesUrl: podcast.listennotes_url,
  rss: podcast.rss,
  description: truncateDescription(podcast.description_original),
  title: podcast.title_original,
  publisher: podcast.publisher_original,
  image: podcast.image,
  thumbnail: podcast.thumbnail,
  podcastItunesId: podcast.itunes_id,
  latestPubDate: convertToDate(podcast.latest_pub_date_ms),
  earliestPubDate: convertToDate(podcast.earliest_pub_date_ms),
  genreIds: podcast.genre_ids,
  totalEpisodes: podcast.total_episodes
})

export type ListennotesSearchResult = {
  count: number
  next_offset: number
  total: number
  results: ListennotesEpisodeSearchResult[] | ListennotesPodcastSearchResult[]
}
