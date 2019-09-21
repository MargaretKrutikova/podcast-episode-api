import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Episode = {
  __typename?: "Episode";
  id: Scalars["String"];
  listennotesUrl: Scalars["String"];
  lengthSec: Scalars["Int"];
  rss: Scalars["String"];
  description: Scalars["String"];
  title: Scalars["String"];
  publisher: Scalars["String"];
  image: Scalars["String"];
  thumbnail: Scalars["String"];
  podcastItunesId: Scalars["Int"];
  pubDate: Scalars["String"];
  podcastId: Scalars["String"];
  genreIds: Array<Scalars["Int"]>;
  podcastTitle: Scalars["String"];
  podcastListennotesUrl: Scalars["String"];
};

export type ItunesEpisode = {
  __typename?: "ItunesEpisode";
  id?: Maybe<Scalars["String"]>;
  websiteUrl?: Maybe<Scalars["String"]>;
};

export type Podcast = {
  __typename?: "Podcast";
  id: Scalars["String"];
  listennotesUrl: Scalars["String"];
  rss: Scalars["String"];
  description: Scalars["String"];
  title: Scalars["String"];
  publisher: Scalars["String"];
  image: Scalars["String"];
  thumbnail: Scalars["String"];
  podcastItunesId: Scalars["Int"];
  latestPubDate: Scalars["String"];
  earliestPubDate: Scalars["String"];
  genreIds: Array<Scalars["Int"]>;
  totalEpisodes: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  itunesEpisode: ItunesEpisode;
  search: SearchResults;
  getPodcastById?: Maybe<Podcast>;
};

export type QueryItunesEpisodeArgs = {
  podcastId: Scalars["String"];
  episodeName: Scalars["String"];
};

export type QuerySearchArgs = {
  input: SearchInput;
};

export type QueryGetPodcastByIdArgs = {
  podcastId: Scalars["String"];
};

export enum Search_Type {
  Episode = "EPISODE",
  Podcast = "PODCAST"
}

export type SearchInput = {
  searchType: Search_Type;
  language?: Maybe<Scalars["String"]>;
  genreIds?: Maybe<Array<Scalars["Int"]>>;
  searchTerm: Scalars["String"];
  offset: Scalars["Int"];
  podcastId?: Maybe<Scalars["String"]>;
  excludePodcastId?: Maybe<Scalars["String"]>;
};

export type SearchResult = Episode | Podcast;

export type SearchResults = {
  __typename?: "SearchResults";
  count: Scalars["Int"];
  nextOffset: Scalars["Int"];
  total: Scalars["Int"];
  results: Array<SearchResult>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  ItunesEpisode: ResolverTypeWrapper<ItunesEpisode>;
  SearchInput: SearchInput;
  SEARCH_TYPE: Search_Type;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  SearchResults: ResolverTypeWrapper<
    Omit<SearchResults, "results"> & {
      results: Array<ResolversTypes["SearchResult"]>;
    }
  >;
  SearchResult: ResolversTypes["Episode"] | ResolversTypes["Podcast"];
  Episode: ResolverTypeWrapper<Episode>;
  Podcast: ResolverTypeWrapper<Podcast>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  ItunesEpisode: ItunesEpisode;
  SearchInput: SearchInput;
  SEARCH_TYPE: Search_Type;
  Int: Scalars["Int"];
  SearchResults: Omit<SearchResults, "results"> & {
    results: Array<ResolversTypes["SearchResult"]>;
  };
  SearchResult: ResolversTypes["Episode"] | ResolversTypes["Podcast"];
  Episode: Episode;
  Podcast: Podcast;
  Boolean: Scalars["Boolean"];
};

export type EpisodeResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Episode"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  listennotesUrl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lengthSec?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rss?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  podcastItunesId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pubDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  podcastId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  genreIds?: Resolver<Array<ResolversTypes["Int"]>, ParentType, ContextType>;
  podcastTitle?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  podcastListennotesUrl?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
};

export type ItunesEpisodeResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["ItunesEpisode"]
> = {
  id?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  websiteUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type PodcastResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Podcast"]
> = {
  id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  listennotesUrl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  rss?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  podcastItunesId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  latestPubDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  earliestPubDate?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  genreIds?: Resolver<Array<ResolversTypes["Int"]>, ParentType, ContextType>;
  totalEpisodes?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  itunesEpisode?: Resolver<
    ResolversTypes["ItunesEpisode"],
    ParentType,
    ContextType,
    QueryItunesEpisodeArgs
  >;
  search?: Resolver<
    ResolversTypes["SearchResults"],
    ParentType,
    ContextType,
    QuerySearchArgs
  >;
  getPodcastById?: Resolver<
    Maybe<ResolversTypes["Podcast"]>,
    ParentType,
    ContextType,
    QueryGetPodcastByIdArgs
  >;
};

export type SearchResultResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["SearchResult"]
> = {
  __resolveType: TypeResolveFn<"Episode" | "Podcast", ParentType, ContextType>;
};

export type SearchResultsResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["SearchResults"]
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  nextOffset?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  results?: Resolver<
    Array<ResolversTypes["SearchResult"]>,
    ParentType,
    ContextType
  >;
};

export type Resolvers<ContextType = any> = {
  Episode?: EpisodeResolvers<ContextType>;
  ItunesEpisode?: ItunesEpisodeResolvers<ContextType>;
  Podcast?: PodcastResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchResult?: SearchResultResolvers;
  SearchResults?: SearchResultsResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
