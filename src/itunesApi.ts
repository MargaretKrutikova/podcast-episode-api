import { ItunesEpisode } from "./generated/graphql"
import axios from "axios"

export type ItunesEpisodeQuery = {
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

const toItunesEpisode = ({ id, attributes }: EpisodeData): ItunesEpisode => ({
  id,
  websiteUrl: attributes ? attributes.websiteUrl : ""
})

const getEpisodeApiUrl = (podcastId: string) =>
  `${process.env.API_URL}/v1/catalog/us/podcasts/${podcastId}/episodes?offset=0&limit=300`

const matchEpisodeName = (actualEpisodeName: string, searchText: string) =>
  actualEpisodeName.toLowerCase() === searchText.toLocaleLowerCase() ||
  actualEpisodeName.toLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1

export const getItunesEpisode = async ({
  episodeName,
  podcastId
}: ItunesEpisodeQuery) => {
  const url = getEpisodeApiUrl(podcastId)
  const { data: response } = await axios.get<PodcastData>(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  })

  const episode = response.data.find(ep =>
    matchEpisodeName(ep.attributes.name, episodeName)
  )
  const data: ItunesEpisode = episode
    ? toItunesEpisode(episode)
    : { id: null, websiteUrl: null }

  return data
}
