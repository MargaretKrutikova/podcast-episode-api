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
  toPodcastSearchResult
} from "./mapping"
import Axios from "axios"

const getListennotesApiUrl = () => "https://listen-api.listennotes.com/api/v2"

type ContentType = "episode" | "podcast"

const getSearchUrl = (
  baseInput: BaseSearchInput,
  content: ContentType,
  episodeInput?: EpisodeSearchInput | null
) => {
  const { genreIds, language = "English", offset = 0, searchTerm } = baseInput
  const genres = genreIds ? genreIds.join(",") : ""
  const { podcastId = "", excludePodcastId = "" } = episodeInput || {}

  const url =
    `${getListennotesApiUrl()}/search?type=${content}&safe_mode=1&q=${searchTerm}&sort_by_date=0` +
    `&language=${language}&offset=${offset}&genre_ids=${genres}&ocid=${podcastId}&ncid=${excludePodcastId}`

  return url
}

export const getEpisodeSearchResults = async (
  input: BaseSearchInput,
  episodeInput?: EpisodeSearchInput | null
) => {
  const url = getSearchUrl(input, "episode", episodeInput)

  const { data } = await Axios.get<ListennotesSearchResult>(url, {
    headers: {
      "X-ListenAPI-Key": process.env.LISTEN_NOTES_API_KEY
    }
  })

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

  const { data } = await Axios.get<ListennotesSearchResult>(url, {
    headers: {
      "X-ListenAPI-Key": process.env.LISTEN_NOTES_API_KEY
    }
  })

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
