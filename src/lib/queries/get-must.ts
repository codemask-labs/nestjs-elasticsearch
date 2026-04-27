import { Document } from 'lib/common'
import { QueriesBody } from 'lib/utils'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { RangeQuery } from './get-range'
import { MatchQuery } from './get-match'
import { MatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { ExistsQuery } from './get-exists'

export type MustQueryBody<TDocument extends Document> =
    | QueriesBody<TDocument>
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | MatchQuery<TDocument>
    | ExistsQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>

export type MustQuery<TDocument extends Document> = {
    must: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>
}

/**
 * Builds the `must` clause for a `bool` query. Documents must match all provided queries
 * and their scores contribute to the overall relevance score. Pass the result to `getBoolQuery`.
 *
 * @param must - A single query clause or an array of query clauses that all must match.
 * @returns A `MustQuery` object to be composed into a `getBoolQuery` call.
 */
export const getMustQuery = <TDocument extends Document>(must: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>): MustQuery<TDocument> => ({
    must,
})
