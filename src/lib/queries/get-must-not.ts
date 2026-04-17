import { Document } from 'lib/common'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { ExistsQuery } from './get-exists'
import { RangeQuery } from './get-range'

export type MustNotQueryBody<TDocument extends Document> =
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | BoolQuery<TDocument>
    | ExistsQuery<TDocument>
    | RangeQuery<TDocument>

export type MustNotQuery<TDocument extends Document> = {
    must_not: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>
}

/**
 * Builds the `must_not` clause for a `bool` query. Documents matching any of the provided
 * queries are excluded from results. Matching does not affect the relevance score.
 * Pass the result to `getBoolQuery`.
 *
 * @param mustNot - A single query clause or an array of query clauses that must not match.
 * @returns A `MustNotQuery` object to be composed into a `getBoolQuery` call.
 */
export const getMustNotQuery = <TDocument extends Document>(
    mustNot: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>,
): MustNotQuery<TDocument> => ({
    must_not: mustNot,
})
