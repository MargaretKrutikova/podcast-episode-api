import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type EpisodeSearchResult = {
  __typename?: "EpisodeSearchResult";
  listennotesId: Scalars["String"];
  listennotesUrl: Scalars["String"];
  lengthSec?: Maybe<Scalars["Int"]>;
  rss: Scalars["String"];
  description: Scalars["String"];
  title: Scalars["String"];
  publisher: Scalars["String"];
  image?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  podcastItunesId: Scalars["Int"];
  pubDateMs?: Maybe<Scalars["Int"]>;
  podcastListennotesId: Scalars["String"];
  genreIds: Array<Maybe<Scalars["Int"]>>;
  podcastTitle: Scalars["String"];
  podcastListennotesUrl?: Maybe<Scalars["String"]>;
};

export type EpisodeSearchResults = {
  __typename?: "EpisodeSearchResults";
  count: Scalars["Int"];
  nextOffset: Scalars["Int"];
  total: Scalars["Int"];
  results: Array<Maybe<EpisodeSearchResult>>;
};

export type ItunesEpisode = {
  __typename?: "ItunesEpisode";
  id?: Maybe<Scalars["String"]>;
  websiteUrl?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  itunesEpisode?: Maybe<ItunesEpisode>;
  searchEpisodes?: Maybe<EpisodeSearchResults>;
};

export type QueryItunesEpisodeArgs = {
  podcastId: Scalars["String"];
  episodeName: Scalars["String"];
};

export type QuerySearchEpisodesArgs = {
  input: SearchInput;
};

export type SearchInput = {
  term: Scalars["String"];
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
  EpisodeSearchResults: ResolverTypeWrapper<EpisodeSearchResults>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  EpisodeSearchResult: ResolverTypeWrapper<EpisodeSearchResult>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars["Upload"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  ItunesEpisode: ItunesEpisode;
  SearchInput: SearchInput;
  EpisodeSearchResults: EpisodeSearchResults;
  Int: Scalars["Int"];
  EpisodeSearchResult: EpisodeSearchResult;
  Boolean: Scalars["Boolean"];
  CacheControlScope: CacheControlScope;
  Upload: Scalars["Upload"];
};

export type CacheControlDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = {
    maxAge?: Maybe<Maybe<Scalars["Int"]>>;
    scope?: Maybe<Maybe<CacheControlScope>>;
  }
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EpisodeSearchResultResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["EpisodeSearchResult"]
> = {
  listennotesId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  listennotesUrl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  lengthSec?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  rss?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  publisher?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  thumbnail?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  podcastItunesId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  pubDateMs?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  podcastListennotesId?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  genreIds?: Resolver<
    Array<Maybe<ResolversTypes["Int"]>>,
    ParentType,
    ContextType
  >;
  podcastTitle?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  podcastListennotesUrl?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
};

export type EpisodeSearchResultsResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["EpisodeSearchResults"]
> = {
  count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  nextOffset?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  results?: Resolver<
    Array<Maybe<ResolversTypes["EpisodeSearchResult"]>>,
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

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  itunesEpisode?: Resolver<
    Maybe<ResolversTypes["ItunesEpisode"]>,
    ParentType,
    ContextType,
    QueryItunesEpisodeArgs
  >;
  searchEpisodes?: Resolver<
    Maybe<ResolversTypes["EpisodeSearchResults"]>,
    ParentType,
    ContextType,
    QuerySearchEpisodesArgs
  >;
};

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Upload"], any> {
  name: "Upload";
}

export type Resolvers<ContextType = any> = {
  EpisodeSearchResult?: EpisodeSearchResultResolvers<ContextType>;
  EpisodeSearchResults?: EpisodeSearchResultsResolvers<ContextType>;
  ItunesEpisode?: ItunesEpisodeResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};

/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<
  ContextType
>;
