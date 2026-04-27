import { Document, Nullable } from 'lib/common'
import { BoolQuery, ExistsQuery, MatchPhrasePrefixQuery, MustQuery, RangeQuery, TermQuery, TermsQuery } from 'lib/queries'
import { isNil, reject } from 'ramda'

export type QueriesBody<TDocument extends Document> =
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | ExistsQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>
    | MustQuery<TDocument>

/**
 * Filters out `null` and `undefined` entries from an array of query clauses.
 * Designed to work with nullable query builders like `getTermQuery` and `getTermsQuery`,
 * which return `null` when passed a nil value. The resulting array is safe to pass
 * directly to `getMustQuery`, `getShouldQuery`, or `getMustNotQuery`.
 *
 * @param filters - An array of query clauses that may include `null` or `undefined` entries.
 * @returns A new array with all `null` and `undefined` entries removed.
 */
export const getQueries = <TDocument extends Document>(filters: Array<Nullable<QueriesBody<TDocument>>>): Array<QueriesBody<TDocument>> =>
    reject(isNil, filters)
