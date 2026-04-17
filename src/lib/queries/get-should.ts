import { Document } from 'lib/common'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { RangeQuery } from './get-range'
import { MatchQuery } from './get-match'
import { MatchPhrasePrefixQuery } from './get-match-phrase-prefix'
import { ExistsQuery } from './get-exists'

export type ShouldQueryBody<TDocument extends Document> =
    | BoolQuery<TDocument>
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | RangeQuery<TDocument>
    | MatchQuery<TDocument>
    | MatchPhrasePrefixQuery<TDocument>
    | ExistsQuery<TDocument>

export type ShouldQuery<TDocument extends Document> = {
    should: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>
}

/**
 * Builds the `should` clause for a `bool` query. Documents matching at least one of the provided
 * queries are preferred and receive a higher relevance score. Use `minimum_should_match` via
 * `getMinimumShouldMatchParameter` to require a minimum number of matches.
 * Pass the result to `getBoolQuery`.
 *
 * @param should - A single query clause or an array of query clauses where at least one should match.
 * @returns A `ShouldQuery` object to be composed into a `getBoolQuery` call.
 */
export const getShouldQuery = <TDocument extends Document>(
    should: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>,
): ShouldQuery<TDocument> => ({
    should,
})
