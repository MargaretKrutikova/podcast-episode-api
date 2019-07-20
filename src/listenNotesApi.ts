import { SearchInput, EpisodeSearchResults } from "./generated/graphql"
import {
  ListennotesSearchResult,
  toEpisodeSearchResult,
  ListennotesEpisodeSearchResult
} from "./mapping"
import Axios from "axios"

const getListennotesApiUrl = () => "https://listen-api.listennotes.com/api/v2"

export const getEpisodeSearchResults = async ({
  term,
  genreIds
}: SearchInput) => {
  const genres = genreIds ? genreIds.join(",") : ""
  const url = `${getListennotesApiUrl()}/search?type=episode&safe_mode=1&q=${term}&sort_by_date=0&language=English&offset=0&genre_ids=${genres}`

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
