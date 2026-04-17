import { Document } from 'lib/common'
import { MinimumShouldMatchParameter } from 'lib/parameters'
import { ShouldQuery } from './get-should'
import { MustQuery } from './get-must'
import { MustNotQuery } from './get-must-not'

export type BoolQueryBody<TDocument extends Document> =
    | MustQuery<TDocument>
    | ShouldQuery<TDocument>
    | MustNotQuery<TDocument>
    | MinimumShouldMatchParameter

export type BoolQuery<TDocument extends Document> = {
    bool: BoolQueryBody<TDocument> | Array<BoolQueryBody<TDocument>>
}

/**
 * Builds an Elasticsearch `bool` query wrapping one or more `must`, `should`, `must_not`,
 * or `minimum_should_match` clauses. Combine with `getMustQuery`, `getShouldQuery`, and
 * `getMustNotQuery` to compose compound queries.
 *
 * @param bool - A single bool clause or an array of bool clauses to include in the query.
 * @returns A `BoolQuery` object ready to be passed to a search request.
 */
export const getBoolQuery = <TDocument extends Document>(bool: BoolQueryBody<TDocument> | Array<BoolQueryBody<TDocument>>): BoolQuery<TDocument> => ({
    bool,
})
