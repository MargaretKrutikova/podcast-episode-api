import {
  BaseSearchInput,
  EpisodeSearchInput,
  EpisodeSearchResults,
  PodcastSearchResults
} from "./generated/graphql"
import {
  ListennotesSearchResult,
  toEpisodeSearchResult,
  ListennotesEpisodeSearchResult,
  ListennotesPodcastSearchResult,
  toPodcastSearchResult,
  ListennotesPodcast,
  toPodcast
} from "./mapping"
import Axios from "axios"

const getListennotesApiUrl = () => "https://listen-api.listennotes.com/api/v2"

type ContentType = "episode" | "podcast"

const getSearchUrl = (
  baseInput: BaseSearchInput,
  content: ContentType,
  episodeInput?: EpisodeSearchInput | null
) => {
  const { genreIds, language, offset = 0, searchTerm } = baseInput

  const genres = genreIds ? genreIds.join(",") : ""
  const { podcastId = "", excludePodcastId = "" } = episodeInput || {}

  let url = `${getListennotesApiUrl()}/search?type=${content}&safe_mode=1&q=${searchTerm}&sort_by_date=0&offset=${offset}`

  if (language) {
    url += `&language=${language}`
  }
  if (genres) {
    url += `&genre_ids=${genres}`
  }
  if (podcastId) {
    url += `&ocid=${podcastId}`
  }
  if (excludePodcastId) {
    url += `&ncid=${excludePodcastId}`
  }
  return url
}

const getAxiosConfig = () => ({
  headers: {
    "X-ListenAPI-Key": process.env.LISTEN_NOTES_API_KEY
  }
})

export const getEpisodeSearchResults = async (
  input: BaseSearchInput,
  episodeInput?: EpisodeSearchInput | null
) => {
  const url = getSearchUrl(input, "episode", episodeInput)

  const { data } = await Axios.get<ListennotesSearchResult>(
    url,
    getAxiosConfig()
  )

  const searchResponse: EpisodeSearchResults = {
    count: data.count,
    nextOffset: data.next_offset,
    total: data.total,
    results: (data.results as ListennotesEpisodeSearchResult[]).map(
      toEpisodeSearchResult
    )
  }

  return searchResponse
}

export const getPodcastSearchResults = async (input: BaseSearchInput) => {
  const url = getSearchUrl(input, "podcast")

  const { data } = await Axios.get<ListennotesSearchResult>(
    url,
    getAxiosConfig()
  )

  const searchResponse: PodcastSearchResults = {
    count: data.count,
    nextOffset: data.next_offset,
    total: data.total,
    results: (data.results as ListennotesPodcastSearchResult[]).map(
      toPodcastSearchResult
    )
  }

  return searchResponse
}

export const getPodcastById = async (podcastId: string) => {
  const url = `${getListennotesApiUrl()}/podcasts/${podcastId}`

  try {
    const { data } = await Axios.get<ListennotesPodcast>(url, getAxiosConfig())
    if (!data || !data.id) {
      return null
    }
    return toPodcast(data)
  } catch {
    return null
  }
}
