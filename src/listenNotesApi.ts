import { SearchInput, SearchResults, Search_Type } from "./generated/graphql"
import {
  ListennotesSearchResult,
  fromEpisodeSearchResult,
  ListennotesEpisodeSearchResult,
  ListennotesPodcastSearchResult,
  fromPodcastSearchResult,
  ListennotesPodcast,
  fromPodcast
} from "./mapping"
import Axios from "axios"

const getListennotesApiUrl = () => "https://listen-api.listennotes.com/api/v2"

const getSearchUrl = (input: SearchInput) => {
  const {
    genreIds,
    language,
    offset = 0,
    searchTerm,
    podcastId = "",
    excludePodcastId = "",
    searchType
  } = input

  const genres = genreIds ? genreIds.join(",") : ""

  let url = `${getListennotesApiUrl()}/search?type=${searchType.toLowerCase()}&safe_mode=1&q=${searchTerm}&sort_by_date=0&offset=${offset}`

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

export const getSearchResults = async (input: SearchInput) => {
  const url = getSearchUrl(input)

  const { data } = await Axios.get<ListennotesSearchResult>(
    url,
    getAxiosConfig()
  )

  const searchResponse: SearchResults = {
    count: data.count,
    nextOffset: data.next_offset,
    total: data.total,
    results:
      input.searchType === Search_Type.Episode
        ? (data.results as ListennotesEpisodeSearchResult[]).map(
            fromEpisodeSearchResult
          )
        : (data.results as ListennotesPodcastSearchResult[]).map(
            fromPodcastSearchResult
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
    return fromPodcast(data)
  } catch {
    return null
  }
}
