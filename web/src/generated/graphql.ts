import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  publishers: Array<Publisher>;
  series: Array<Series>;
};

export type Creator = {
  __typename?: 'Creator';
  bio: Scalars['String']['output'];
  birthCity: Scalars['String']['output'];
  birthCountry?: Maybe<Country>;
  birthProvince: Scalars['String']['output'];
  deathCity: Scalars['String']['output'];
  deathCountry?: Maybe<Country>;
  deathProvince: Scalars['String']['output'];
  disambiguation: Scalars['String']['output'];
  gcdOfficialName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  nameDetails: Array<CreatorNameDetail>;
  notes: Scalars['String']['output'];
  sortName: Scalars['String']['output'];
};

export type CreatorConnection = {
  __typename?: 'CreatorConnection';
  items: Array<Creator>;
  totalCount: Scalars['Int']['output'];
};

export type CreatorNameDetail = {
  __typename?: 'CreatorNameDetail';
  creator: Creator;
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isOfficialName: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  sortName: Scalars['String']['output'];
};

export type CreditType = {
  __typename?: 'CreditType';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  sortCode: Scalars['Int']['output'];
};

export type Issue = {
  __typename?: 'Issue';
  barcode: Scalars['String']['output'];
  coverImageUrl?: Maybe<Scalars['String']['output']>;
  editing: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isbn: Scalars['String']['output'];
  keyDate: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  number: Scalars['String']['output'];
  onSaleDate: Scalars['String']['output'];
  pageCount?: Maybe<Scalars['Float']['output']>;
  price: Scalars['String']['output'];
  publicationDate: Scalars['String']['output'];
  rating: Scalars['String']['output'];
  series: Series;
  sortCode: Scalars['Int']['output'];
  stories: Array<Story>;
  title: Scalars['String']['output'];
  variantName: Scalars['String']['output'];
  variantOf?: Maybe<Issue>;
  volume: Scalars['String']['output'];
};


export type IssueStoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type IssueConnection = {
  __typename?: 'IssueConnection';
  items: Array<Issue>;
  totalCount: Scalars['Int']['output'];
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  nativeName: Scalars['String']['output'];
  series: Array<Series>;
};

export type Publisher = {
  __typename?: 'Publisher';
  country: Country;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  series: Array<Series>;
  url: Scalars['String']['output'];
  yearBegan?: Maybe<Scalars['Int']['output']>;
  yearEnded?: Maybe<Scalars['Int']['output']>;
};


export type PublisherSeriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type PublisherConnection = {
  __typename?: 'PublisherConnection';
  items: Array<Publisher>;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  allSeries: SeriesConnection;
  countries: Array<Country>;
  creator?: Maybe<Creator>;
  creators: CreatorConnection;
  creditTypes: Array<CreditType>;
  issue?: Maybe<Issue>;
  issues: IssueConnection;
  languages: Array<Language>;
  publisher?: Maybe<Publisher>;
  publishers: PublisherConnection;
  searchIssues: IssueConnection;
  series?: Maybe<Series>;
  seriesPublicationTypes: Array<SeriesPublicationType>;
  stories: StoryConnection;
  story?: Maybe<Story>;
  storyTypes: Array<StoryType>;
};


export type QueryAllSeriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  publisherId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCreatorArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCreatorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryIssueArgs = {
  id: Scalars['Int']['input'];
};


export type QueryIssuesArgs = {
  issueNumber?: InputMaybe<Scalars['String']['input']>;
  keyDate?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  onSaleDate?: InputMaybe<Scalars['String']['input']>;
  seriesId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPublisherArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPublishersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySearchIssuesArgs = {
  issueNumber: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search: Scalars['String']['input'];
};


export type QuerySeriesArgs = {
  id: Scalars['Int']['input'];
};


export type QueryStoriesArgs = {
  issueId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryStoryArgs = {
  id: Scalars['Int']['input'];
};

export type Series = {
  __typename?: 'Series';
  binding: Scalars['String']['output'];
  color: Scalars['String']['output'];
  country: Country;
  dimensions: Scalars['String']['output'];
  format: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  issueCount: Scalars['Int']['output'];
  issues: Array<Issue>;
  language: Language;
  name: Scalars['String']['output'];
  publicationDates: Scalars['String']['output'];
  publicationType?: Maybe<SeriesPublicationType>;
  publisher: Publisher;
  publishingFormat: Scalars['String']['output'];
  sortName: Scalars['String']['output'];
  yearBegan: Scalars['Int']['output'];
  yearEnded?: Maybe<Scalars['Int']['output']>;
};


export type SeriesIssuesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type SeriesConnection = {
  __typename?: 'SeriesConnection';
  items: Array<Series>;
  totalCount: Scalars['Int']['output'];
};

export type SeriesPublicationType = {
  __typename?: 'SeriesPublicationType';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  notes: Scalars['String']['output'];
};

export type Story = {
  __typename?: 'Story';
  characters: Scalars['String']['output'];
  colors: Scalars['String']['output'];
  credits: Array<StoryCredit>;
  editing: Scalars['String']['output'];
  feature: Scalars['String']['output'];
  firstLine: Scalars['String']['output'];
  genre: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  inks: Scalars['String']['output'];
  issue: Issue;
  jobNumber: Scalars['String']['output'];
  letters: Scalars['String']['output'];
  pageCount?: Maybe<Scalars['Float']['output']>;
  pencils: Scalars['String']['output'];
  script: Scalars['String']['output'];
  sequenceNumber: Scalars['Int']['output'];
  synopsis: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: StoryType;
};

export type StoryConnection = {
  __typename?: 'StoryConnection';
  items: Array<Story>;
  totalCount: Scalars['Int']['output'];
};

export type StoryCredit = {
  __typename?: 'StoryCredit';
  creatorNameDetail: CreatorNameDetail;
  creditName: Scalars['String']['output'];
  creditType: CreditType;
  creditedAs: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isCredited: Scalars['Boolean']['output'];
  isSigned: Scalars['Boolean']['output'];
  signedAs: Scalars['String']['output'];
  story: Story;
  uncertain: Scalars['Boolean']['output'];
};

export type StoryType = {
  __typename?: 'StoryType';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  sortCode: Scalars['Int']['output'];
};

export type SearchCreatorsQueryVariables = Exact<{
  search: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchCreatorsQuery = { __typename?: 'Query', creators: { __typename?: 'CreatorConnection', totalCount: number, items: Array<{ __typename?: 'Creator', id: number, gcdOfficialName: string, sortName: string }> } };

export type GetCreatorQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetCreatorQuery = { __typename?: 'Query', creator?: { __typename?: 'Creator', id: number, gcdOfficialName: string, sortName: string, birthCity: string, birthProvince: string, deathCity: string, deathProvince: string, bio: string, notes: string, disambiguation: string, birthCountry?: { __typename?: 'Country', id: number, name: string } | null, deathCountry?: { __typename?: 'Country', id: number, name: string } | null, nameDetails: Array<{ __typename?: 'CreatorNameDetail', id: number, name: string, isOfficialName: boolean, familyName: string, givenName: string }> } | null };

export type GetSeriesWithCoverQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSeriesWithCoverQuery = { __typename?: 'Query', series?: { __typename?: 'Series', id: number, name: string, yearBegan: number, yearEnded?: number | null, issueCount: number, publisher: { __typename?: 'Publisher', id: number, name: string }, issues: Array<{ __typename?: 'Issue', id: number, coverImageUrl?: string | null }> } | null };

export type GetIssuesQueryVariables = Exact<{
  seriesId?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetIssuesQuery = { __typename?: 'Query', issues: { __typename?: 'IssueConnection', totalCount: number, items: Array<{ __typename?: 'Issue', id: number, number: string, title: string, publicationDate: string, keyDate: string, onSaleDate: string, coverImageUrl?: string | null, series: { __typename?: 'Series', id: number, name: string } }> } };

export type IssuesByKeyDateQueryVariables = Exact<{
  keyDate: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IssuesByKeyDateQuery = { __typename?: 'Query', issues: { __typename?: 'IssueConnection', totalCount: number, items: Array<{ __typename?: 'Issue', id: number, number: string, title: string, keyDate: string, coverImageUrl?: string | null, series: { __typename?: 'Series', id: number, name: string } }> } };

export type IssuesByOnSaleDateQueryVariables = Exact<{
  onSaleDate: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type IssuesByOnSaleDateQuery = { __typename?: 'Query', issues: { __typename?: 'IssueConnection', totalCount: number, items: Array<{ __typename?: 'Issue', id: number, number: string, title: string, onSaleDate: string, coverImageUrl?: string | null, series: { __typename?: 'Series', id: number, name: string } }> } };

export type GetIssueQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetIssueQuery = { __typename?: 'Query', issue?: { __typename?: 'Issue', id: number, number: string, volume: string, title: string, publicationDate: string, keyDate: string, price: string, pageCount?: number | null, isbn: string, barcode: string, onSaleDate: string, rating: string, variantName: string, editing: string, notes: string, sortCode: number, coverImageUrl?: string | null, series: { __typename?: 'Series', id: number, name: string, publisher: { __typename?: 'Publisher', id: number, name: string } }, variantOf?: { __typename?: 'Issue', id: number, number: string } | null, stories: Array<{ __typename?: 'Story', id: number, title: string, feature: string, sequenceNumber: number, type: { __typename?: 'StoryType', name: string } }> } | null };

export type SearchIssuesQueryVariables = Exact<{
  search: Scalars['String']['input'];
  issueNumber: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchIssuesQuery = { __typename?: 'Query', searchIssues: { __typename?: 'IssueConnection', totalCount: number, items: Array<{ __typename?: 'Issue', id: number, number: string, title: string, coverImageUrl?: string | null, series: { __typename?: 'Series', id: number, name: string } }> } };

export type SearchSeriesQueryVariables = Exact<{
  search: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchSeriesQuery = { __typename?: 'Query', allSeries: { __typename?: 'SeriesConnection', totalCount: number, items: Array<{ __typename?: 'Series', id: number, name: string, yearBegan: number, yearEnded?: number | null, issueCount: number, publisher: { __typename?: 'Publisher', id: number, name: string } }> } };

export type GetSeriesQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSeriesQuery = { __typename?: 'Query', series?: { __typename?: 'Series', id: number, name: string, sortName: string, format: string, yearBegan: number, yearEnded?: number | null, publicationDates: string, issueCount: number, color: string, dimensions: string, binding: string, publishingFormat: string, publisher: { __typename?: 'Publisher', id: number, name: string }, country: { __typename?: 'Country', id: number, name: string }, language: { __typename?: 'Language', id: number, name: string }, publicationType?: { __typename?: 'SeriesPublicationType', id: number, name: string } | null, issues: Array<{ __typename?: 'Issue', id: number, number: string, title: string, publicationDate: string, keyDate: string, coverImageUrl?: string | null }> } | null };

export type SeriesByPublisherQueryVariables = Exact<{
  publisherId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SeriesByPublisherQuery = { __typename?: 'Query', allSeries: { __typename?: 'SeriesConnection', totalCount: number, items: Array<{ __typename?: 'Series', id: number, name: string, yearBegan: number, yearEnded?: number | null, issueCount: number, format: string }> } };

export type GetStoriesForIssueQueryVariables = Exact<{
  issueId: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetStoriesForIssueQuery = { __typename?: 'Query', stories: { __typename?: 'StoryConnection', totalCount: number, items: Array<{ __typename?: 'Story', id: number, title: string, feature: string, sequenceNumber: number, pageCount?: number | null, genre: string, characters: string, synopsis: string, type: { __typename?: 'StoryType', name: string } }> } };

export type GetStoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetStoryQuery = { __typename?: 'Query', story?: { __typename?: 'Story', id: number, title: string, feature: string, sequenceNumber: number, pageCount?: number | null, script: string, pencils: string, inks: string, colors: string, letters: string, editing: string, genre: string, characters: string, synopsis: string, firstLine: string, jobNumber: string, issue: { __typename?: 'Issue', id: number, number: string, series: { __typename?: 'Series', id: number, name: string } }, type: { __typename?: 'StoryType', name: string }, credits: Array<{ __typename?: 'StoryCredit', id: number, isCredited: boolean, creditName: string, creditedAs: string, creditType: { __typename?: 'CreditType', name: string }, creatorNameDetail: { __typename?: 'CreatorNameDetail', name: string, creator: { __typename?: 'Creator', id: number, gcdOfficialName: string } } }> } | null };


export const SearchCreatorsDocument = gql`
    query SearchCreators($search: String!, $limit: Int, $offset: Int) {
  creators(search: $search, limit: $limit, offset: $offset) {
    items {
      id
      gcdOfficialName
      sortName
    }
    totalCount
  }
}
    `;

/**
 * __useSearchCreatorsQuery__
 *
 * To run a query within a React component, call `useSearchCreatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCreatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCreatorsQuery({
 *   variables: {
 *      search: // value for 'search'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchCreatorsQuery(baseOptions: Apollo.QueryHookOptions<SearchCreatorsQuery, SearchCreatorsQueryVariables> & ({ variables: SearchCreatorsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchCreatorsQuery, SearchCreatorsQueryVariables>(SearchCreatorsDocument, options);
      }
export function useSearchCreatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchCreatorsQuery, SearchCreatorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchCreatorsQuery, SearchCreatorsQueryVariables>(SearchCreatorsDocument, options);
        }
// @ts-ignore
export function useSearchCreatorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchCreatorsQuery, SearchCreatorsQueryVariables>): Apollo.UseSuspenseQueryResult<SearchCreatorsQuery, SearchCreatorsQueryVariables>;
export function useSearchCreatorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCreatorsQuery, SearchCreatorsQueryVariables>): Apollo.UseSuspenseQueryResult<SearchCreatorsQuery | undefined, SearchCreatorsQueryVariables>;
export function useSearchCreatorsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchCreatorsQuery, SearchCreatorsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchCreatorsQuery, SearchCreatorsQueryVariables>(SearchCreatorsDocument, options);
        }
export type SearchCreatorsQueryHookResult = ReturnType<typeof useSearchCreatorsQuery>;
export type SearchCreatorsLazyQueryHookResult = ReturnType<typeof useSearchCreatorsLazyQuery>;
export type SearchCreatorsSuspenseQueryHookResult = ReturnType<typeof useSearchCreatorsSuspenseQuery>;
export type SearchCreatorsQueryResult = Apollo.QueryResult<SearchCreatorsQuery, SearchCreatorsQueryVariables>;
export const GetCreatorDocument = gql`
    query GetCreator($id: Int!) {
  creator(id: $id) {
    id
    gcdOfficialName
    sortName
    birthCity
    birthProvince
    deathCity
    deathProvince
    bio
    notes
    disambiguation
    birthCountry {
      id
      name
    }
    deathCountry {
      id
      name
    }
    nameDetails {
      id
      name
      isOfficialName
      familyName
      givenName
    }
  }
}
    `;

/**
 * __useGetCreatorQuery__
 *
 * To run a query within a React component, call `useGetCreatorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreatorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreatorQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCreatorQuery(baseOptions: Apollo.QueryHookOptions<GetCreatorQuery, GetCreatorQueryVariables> & ({ variables: GetCreatorQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCreatorQuery, GetCreatorQueryVariables>(GetCreatorDocument, options);
      }
export function useGetCreatorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreatorQuery, GetCreatorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCreatorQuery, GetCreatorQueryVariables>(GetCreatorDocument, options);
        }
// @ts-ignore
export function useGetCreatorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCreatorQuery, GetCreatorQueryVariables>): Apollo.UseSuspenseQueryResult<GetCreatorQuery, GetCreatorQueryVariables>;
export function useGetCreatorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCreatorQuery, GetCreatorQueryVariables>): Apollo.UseSuspenseQueryResult<GetCreatorQuery | undefined, GetCreatorQueryVariables>;
export function useGetCreatorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCreatorQuery, GetCreatorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCreatorQuery, GetCreatorQueryVariables>(GetCreatorDocument, options);
        }
export type GetCreatorQueryHookResult = ReturnType<typeof useGetCreatorQuery>;
export type GetCreatorLazyQueryHookResult = ReturnType<typeof useGetCreatorLazyQuery>;
export type GetCreatorSuspenseQueryHookResult = ReturnType<typeof useGetCreatorSuspenseQuery>;
export type GetCreatorQueryResult = Apollo.QueryResult<GetCreatorQuery, GetCreatorQueryVariables>;
export const GetSeriesWithCoverDocument = gql`
    query GetSeriesWithCover($id: Int!) {
  series(id: $id) {
    id
    name
    yearBegan
    yearEnded
    issueCount
    publisher {
      id
      name
    }
    issues(limit: 1) {
      id
      coverImageUrl
    }
  }
}
    `;

/**
 * __useGetSeriesWithCoverQuery__
 *
 * To run a query within a React component, call `useGetSeriesWithCoverQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeriesWithCoverQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeriesWithCoverQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSeriesWithCoverQuery(baseOptions: Apollo.QueryHookOptions<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables> & ({ variables: GetSeriesWithCoverQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>(GetSeriesWithCoverDocument, options);
      }
export function useGetSeriesWithCoverLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>(GetSeriesWithCoverDocument, options);
        }
// @ts-ignore
export function useGetSeriesWithCoverSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>): Apollo.UseSuspenseQueryResult<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>;
export function useGetSeriesWithCoverSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>): Apollo.UseSuspenseQueryResult<GetSeriesWithCoverQuery | undefined, GetSeriesWithCoverQueryVariables>;
export function useGetSeriesWithCoverSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>(GetSeriesWithCoverDocument, options);
        }
export type GetSeriesWithCoverQueryHookResult = ReturnType<typeof useGetSeriesWithCoverQuery>;
export type GetSeriesWithCoverLazyQueryHookResult = ReturnType<typeof useGetSeriesWithCoverLazyQuery>;
export type GetSeriesWithCoverSuspenseQueryHookResult = ReturnType<typeof useGetSeriesWithCoverSuspenseQuery>;
export type GetSeriesWithCoverQueryResult = Apollo.QueryResult<GetSeriesWithCoverQuery, GetSeriesWithCoverQueryVariables>;
export const GetIssuesDocument = gql`
    query GetIssues($seriesId: Int, $limit: Int, $offset: Int) {
  issues(seriesId: $seriesId, limit: $limit, offset: $offset) {
    items {
      id
      number
      title
      publicationDate
      keyDate
      onSaleDate
      coverImageUrl
      series {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetIssuesQuery__
 *
 * To run a query within a React component, call `useGetIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIssuesQuery({
 *   variables: {
 *      seriesId: // value for 'seriesId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetIssuesQuery(baseOptions?: Apollo.QueryHookOptions<GetIssuesQuery, GetIssuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIssuesQuery, GetIssuesQueryVariables>(GetIssuesDocument, options);
      }
export function useGetIssuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIssuesQuery, GetIssuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIssuesQuery, GetIssuesQueryVariables>(GetIssuesDocument, options);
        }
// @ts-ignore
export function useGetIssuesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIssuesQuery, GetIssuesQueryVariables>): Apollo.UseSuspenseQueryResult<GetIssuesQuery, GetIssuesQueryVariables>;
export function useGetIssuesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIssuesQuery, GetIssuesQueryVariables>): Apollo.UseSuspenseQueryResult<GetIssuesQuery | undefined, GetIssuesQueryVariables>;
export function useGetIssuesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIssuesQuery, GetIssuesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIssuesQuery, GetIssuesQueryVariables>(GetIssuesDocument, options);
        }
export type GetIssuesQueryHookResult = ReturnType<typeof useGetIssuesQuery>;
export type GetIssuesLazyQueryHookResult = ReturnType<typeof useGetIssuesLazyQuery>;
export type GetIssuesSuspenseQueryHookResult = ReturnType<typeof useGetIssuesSuspenseQuery>;
export type GetIssuesQueryResult = Apollo.QueryResult<GetIssuesQuery, GetIssuesQueryVariables>;
export const IssuesByKeyDateDocument = gql`
    query IssuesByKeyDate($keyDate: String!, $limit: Int, $offset: Int) {
  issues(keyDate: $keyDate, limit: $limit, offset: $offset) {
    items {
      id
      number
      title
      keyDate
      coverImageUrl
      series {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useIssuesByKeyDateQuery__
 *
 * To run a query within a React component, call `useIssuesByKeyDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesByKeyDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesByKeyDateQuery({
 *   variables: {
 *      keyDate: // value for 'keyDate'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useIssuesByKeyDateQuery(baseOptions: Apollo.QueryHookOptions<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables> & ({ variables: IssuesByKeyDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>(IssuesByKeyDateDocument, options);
      }
export function useIssuesByKeyDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>(IssuesByKeyDateDocument, options);
        }
// @ts-ignore
export function useIssuesByKeyDateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>): Apollo.UseSuspenseQueryResult<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>;
export function useIssuesByKeyDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>): Apollo.UseSuspenseQueryResult<IssuesByKeyDateQuery | undefined, IssuesByKeyDateQueryVariables>;
export function useIssuesByKeyDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>(IssuesByKeyDateDocument, options);
        }
export type IssuesByKeyDateQueryHookResult = ReturnType<typeof useIssuesByKeyDateQuery>;
export type IssuesByKeyDateLazyQueryHookResult = ReturnType<typeof useIssuesByKeyDateLazyQuery>;
export type IssuesByKeyDateSuspenseQueryHookResult = ReturnType<typeof useIssuesByKeyDateSuspenseQuery>;
export type IssuesByKeyDateQueryResult = Apollo.QueryResult<IssuesByKeyDateQuery, IssuesByKeyDateQueryVariables>;
export const IssuesByOnSaleDateDocument = gql`
    query IssuesByOnSaleDate($onSaleDate: String!, $limit: Int, $offset: Int) {
  issues(onSaleDate: $onSaleDate, limit: $limit, offset: $offset) {
    items {
      id
      number
      title
      onSaleDate
      coverImageUrl
      series {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useIssuesByOnSaleDateQuery__
 *
 * To run a query within a React component, call `useIssuesByOnSaleDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssuesByOnSaleDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssuesByOnSaleDateQuery({
 *   variables: {
 *      onSaleDate: // value for 'onSaleDate'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useIssuesByOnSaleDateQuery(baseOptions: Apollo.QueryHookOptions<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables> & ({ variables: IssuesByOnSaleDateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>(IssuesByOnSaleDateDocument, options);
      }
export function useIssuesByOnSaleDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>(IssuesByOnSaleDateDocument, options);
        }
// @ts-ignore
export function useIssuesByOnSaleDateSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>): Apollo.UseSuspenseQueryResult<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>;
export function useIssuesByOnSaleDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>): Apollo.UseSuspenseQueryResult<IssuesByOnSaleDateQuery | undefined, IssuesByOnSaleDateQueryVariables>;
export function useIssuesByOnSaleDateSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>(IssuesByOnSaleDateDocument, options);
        }
export type IssuesByOnSaleDateQueryHookResult = ReturnType<typeof useIssuesByOnSaleDateQuery>;
export type IssuesByOnSaleDateLazyQueryHookResult = ReturnType<typeof useIssuesByOnSaleDateLazyQuery>;
export type IssuesByOnSaleDateSuspenseQueryHookResult = ReturnType<typeof useIssuesByOnSaleDateSuspenseQuery>;
export type IssuesByOnSaleDateQueryResult = Apollo.QueryResult<IssuesByOnSaleDateQuery, IssuesByOnSaleDateQueryVariables>;
export const GetIssueDocument = gql`
    query GetIssue($id: Int!) {
  issue(id: $id) {
    id
    number
    volume
    title
    publicationDate
    keyDate
    price
    pageCount
    isbn
    barcode
    onSaleDate
    rating
    variantName
    editing
    notes
    sortCode
    coverImageUrl
    series {
      id
      name
      publisher {
        id
        name
      }
    }
    variantOf {
      id
      number
    }
    stories {
      id
      title
      feature
      sequenceNumber
      type {
        name
      }
    }
  }
}
    `;

/**
 * __useGetIssueQuery__
 *
 * To run a query within a React component, call `useGetIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIssueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIssueQuery(baseOptions: Apollo.QueryHookOptions<GetIssueQuery, GetIssueQueryVariables> & ({ variables: GetIssueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIssueQuery, GetIssueQueryVariables>(GetIssueDocument, options);
      }
export function useGetIssueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIssueQuery, GetIssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIssueQuery, GetIssueQueryVariables>(GetIssueDocument, options);
        }
// @ts-ignore
export function useGetIssueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIssueQuery, GetIssueQueryVariables>): Apollo.UseSuspenseQueryResult<GetIssueQuery, GetIssueQueryVariables>;
export function useGetIssueSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIssueQuery, GetIssueQueryVariables>): Apollo.UseSuspenseQueryResult<GetIssueQuery | undefined, GetIssueQueryVariables>;
export function useGetIssueSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIssueQuery, GetIssueQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIssueQuery, GetIssueQueryVariables>(GetIssueDocument, options);
        }
export type GetIssueQueryHookResult = ReturnType<typeof useGetIssueQuery>;
export type GetIssueLazyQueryHookResult = ReturnType<typeof useGetIssueLazyQuery>;
export type GetIssueSuspenseQueryHookResult = ReturnType<typeof useGetIssueSuspenseQuery>;
export type GetIssueQueryResult = Apollo.QueryResult<GetIssueQuery, GetIssueQueryVariables>;
export const SearchIssuesDocument = gql`
    query SearchIssues($search: String!, $issueNumber: String!, $limit: Int, $offset: Int) {
  searchIssues(
    search: $search
    issueNumber: $issueNumber
    limit: $limit
    offset: $offset
  ) {
    items {
      id
      number
      title
      coverImageUrl
      series {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useSearchIssuesQuery__
 *
 * To run a query within a React component, call `useSearchIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIssuesQuery({
 *   variables: {
 *      search: // value for 'search'
 *      issueNumber: // value for 'issueNumber'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchIssuesQuery(baseOptions: Apollo.QueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables> & ({ variables: SearchIssuesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SearchIssuesDocument, options);
      }
export function useSearchIssuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SearchIssuesDocument, options);
        }
// @ts-ignore
export function useSearchIssuesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables>): Apollo.UseSuspenseQueryResult<SearchIssuesQuery, SearchIssuesQueryVariables>;
export function useSearchIssuesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables>): Apollo.UseSuspenseQueryResult<SearchIssuesQuery | undefined, SearchIssuesQueryVariables>;
export function useSearchIssuesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SearchIssuesDocument, options);
        }
export type SearchIssuesQueryHookResult = ReturnType<typeof useSearchIssuesQuery>;
export type SearchIssuesLazyQueryHookResult = ReturnType<typeof useSearchIssuesLazyQuery>;
export type SearchIssuesSuspenseQueryHookResult = ReturnType<typeof useSearchIssuesSuspenseQuery>;
export type SearchIssuesQueryResult = Apollo.QueryResult<SearchIssuesQuery, SearchIssuesQueryVariables>;
export const SearchSeriesDocument = gql`
    query SearchSeries($search: String!, $limit: Int, $offset: Int) {
  allSeries(search: $search, limit: $limit, offset: $offset) {
    items {
      id
      name
      yearBegan
      yearEnded
      issueCount
      publisher {
        id
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useSearchSeriesQuery__
 *
 * To run a query within a React component, call `useSearchSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSeriesQuery({
 *   variables: {
 *      search: // value for 'search'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchSeriesQuery(baseOptions: Apollo.QueryHookOptions<SearchSeriesQuery, SearchSeriesQueryVariables> & ({ variables: SearchSeriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchSeriesQuery, SearchSeriesQueryVariables>(SearchSeriesDocument, options);
      }
export function useSearchSeriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSeriesQuery, SearchSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchSeriesQuery, SearchSeriesQueryVariables>(SearchSeriesDocument, options);
        }
// @ts-ignore
export function useSearchSeriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchSeriesQuery, SearchSeriesQueryVariables>): Apollo.UseSuspenseQueryResult<SearchSeriesQuery, SearchSeriesQueryVariables>;
export function useSearchSeriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchSeriesQuery, SearchSeriesQueryVariables>): Apollo.UseSuspenseQueryResult<SearchSeriesQuery | undefined, SearchSeriesQueryVariables>;
export function useSearchSeriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchSeriesQuery, SearchSeriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchSeriesQuery, SearchSeriesQueryVariables>(SearchSeriesDocument, options);
        }
export type SearchSeriesQueryHookResult = ReturnType<typeof useSearchSeriesQuery>;
export type SearchSeriesLazyQueryHookResult = ReturnType<typeof useSearchSeriesLazyQuery>;
export type SearchSeriesSuspenseQueryHookResult = ReturnType<typeof useSearchSeriesSuspenseQuery>;
export type SearchSeriesQueryResult = Apollo.QueryResult<SearchSeriesQuery, SearchSeriesQueryVariables>;
export const GetSeriesDocument = gql`
    query GetSeries($id: Int!) {
  series(id: $id) {
    id
    name
    sortName
    format
    yearBegan
    yearEnded
    publicationDates
    issueCount
    color
    dimensions
    binding
    publishingFormat
    publisher {
      id
      name
    }
    country {
      id
      name
    }
    language {
      id
      name
    }
    publicationType {
      id
      name
    }
    issues(limit: 100) {
      id
      number
      title
      publicationDate
      keyDate
      coverImageUrl
    }
  }
}
    `;

/**
 * __useGetSeriesQuery__
 *
 * To run a query within a React component, call `useGetSeriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeriesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSeriesQuery(baseOptions: Apollo.QueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables> & ({ variables: GetSeriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeriesQuery, GetSeriesQueryVariables>(GetSeriesDocument, options);
      }
export function useGetSeriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeriesQuery, GetSeriesQueryVariables>(GetSeriesDocument, options);
        }
// @ts-ignore
export function useGetSeriesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetSeriesQuery, GetSeriesQueryVariables>;
export function useGetSeriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables>): Apollo.UseSuspenseQueryResult<GetSeriesQuery | undefined, GetSeriesQueryVariables>;
export function useGetSeriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSeriesQuery, GetSeriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSeriesQuery, GetSeriesQueryVariables>(GetSeriesDocument, options);
        }
export type GetSeriesQueryHookResult = ReturnType<typeof useGetSeriesQuery>;
export type GetSeriesLazyQueryHookResult = ReturnType<typeof useGetSeriesLazyQuery>;
export type GetSeriesSuspenseQueryHookResult = ReturnType<typeof useGetSeriesSuspenseQuery>;
export type GetSeriesQueryResult = Apollo.QueryResult<GetSeriesQuery, GetSeriesQueryVariables>;
export const SeriesByPublisherDocument = gql`
    query SeriesByPublisher($publisherId: Int!, $limit: Int, $offset: Int) {
  allSeries(publisherId: $publisherId, limit: $limit, offset: $offset) {
    items {
      id
      name
      yearBegan
      yearEnded
      issueCount
      format
    }
    totalCount
  }
}
    `;

/**
 * __useSeriesByPublisherQuery__
 *
 * To run a query within a React component, call `useSeriesByPublisherQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeriesByPublisherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeriesByPublisherQuery({
 *   variables: {
 *      publisherId: // value for 'publisherId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSeriesByPublisherQuery(baseOptions: Apollo.QueryHookOptions<SeriesByPublisherQuery, SeriesByPublisherQueryVariables> & ({ variables: SeriesByPublisherQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>(SeriesByPublisherDocument, options);
      }
export function useSeriesByPublisherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>(SeriesByPublisherDocument, options);
        }
// @ts-ignore
export function useSeriesByPublisherSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>): Apollo.UseSuspenseQueryResult<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>;
export function useSeriesByPublisherSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>): Apollo.UseSuspenseQueryResult<SeriesByPublisherQuery | undefined, SeriesByPublisherQueryVariables>;
export function useSeriesByPublisherSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>(SeriesByPublisherDocument, options);
        }
export type SeriesByPublisherQueryHookResult = ReturnType<typeof useSeriesByPublisherQuery>;
export type SeriesByPublisherLazyQueryHookResult = ReturnType<typeof useSeriesByPublisherLazyQuery>;
export type SeriesByPublisherSuspenseQueryHookResult = ReturnType<typeof useSeriesByPublisherSuspenseQuery>;
export type SeriesByPublisherQueryResult = Apollo.QueryResult<SeriesByPublisherQuery, SeriesByPublisherQueryVariables>;
export const GetStoriesForIssueDocument = gql`
    query GetStoriesForIssue($issueId: Int!, $limit: Int, $offset: Int) {
  stories(issueId: $issueId, limit: $limit, offset: $offset) {
    items {
      id
      title
      feature
      sequenceNumber
      pageCount
      genre
      characters
      synopsis
      type {
        name
      }
    }
    totalCount
  }
}
    `;

/**
 * __useGetStoriesForIssueQuery__
 *
 * To run a query within a React component, call `useGetStoriesForIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoriesForIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoriesForIssueQuery({
 *   variables: {
 *      issueId: // value for 'issueId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetStoriesForIssueQuery(baseOptions: Apollo.QueryHookOptions<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables> & ({ variables: GetStoriesForIssueQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>(GetStoriesForIssueDocument, options);
      }
export function useGetStoriesForIssueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>(GetStoriesForIssueDocument, options);
        }
// @ts-ignore
export function useGetStoriesForIssueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>): Apollo.UseSuspenseQueryResult<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>;
export function useGetStoriesForIssueSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>): Apollo.UseSuspenseQueryResult<GetStoriesForIssueQuery | undefined, GetStoriesForIssueQueryVariables>;
export function useGetStoriesForIssueSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>(GetStoriesForIssueDocument, options);
        }
export type GetStoriesForIssueQueryHookResult = ReturnType<typeof useGetStoriesForIssueQuery>;
export type GetStoriesForIssueLazyQueryHookResult = ReturnType<typeof useGetStoriesForIssueLazyQuery>;
export type GetStoriesForIssueSuspenseQueryHookResult = ReturnType<typeof useGetStoriesForIssueSuspenseQuery>;
export type GetStoriesForIssueQueryResult = Apollo.QueryResult<GetStoriesForIssueQuery, GetStoriesForIssueQueryVariables>;
export const GetStoryDocument = gql`
    query GetStory($id: Int!) {
  story(id: $id) {
    id
    title
    feature
    sequenceNumber
    pageCount
    script
    pencils
    inks
    colors
    letters
    editing
    genre
    characters
    synopsis
    firstLine
    jobNumber
    issue {
      id
      number
      series {
        id
        name
      }
    }
    type {
      name
    }
    credits {
      id
      isCredited
      creditName
      creditedAs
      creditType {
        name
      }
      creatorNameDetail {
        name
        creator {
          id
          gcdOfficialName
        }
      }
    }
  }
}
    `;

/**
 * __useGetStoryQuery__
 *
 * To run a query within a React component, call `useGetStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetStoryQuery(baseOptions: Apollo.QueryHookOptions<GetStoryQuery, GetStoryQueryVariables> & ({ variables: GetStoryQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStoryQuery, GetStoryQueryVariables>(GetStoryDocument, options);
      }
export function useGetStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoryQuery, GetStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStoryQuery, GetStoryQueryVariables>(GetStoryDocument, options);
        }
// @ts-ignore
export function useGetStorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetStoryQuery, GetStoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetStoryQuery, GetStoryQueryVariables>;
export function useGetStorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStoryQuery, GetStoryQueryVariables>): Apollo.UseSuspenseQueryResult<GetStoryQuery | undefined, GetStoryQueryVariables>;
export function useGetStorySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetStoryQuery, GetStoryQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetStoryQuery, GetStoryQueryVariables>(GetStoryDocument, options);
        }
export type GetStoryQueryHookResult = ReturnType<typeof useGetStoryQuery>;
export type GetStoryLazyQueryHookResult = ReturnType<typeof useGetStoryLazyQuery>;
export type GetStorySuspenseQueryHookResult = ReturnType<typeof useGetStorySuspenseQuery>;
export type GetStoryQueryResult = Apollo.QueryResult<GetStoryQuery, GetStoryQueryVariables>;