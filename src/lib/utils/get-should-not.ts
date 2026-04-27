import { Document } from 'lib/common'
import { getBoolQuery, getMustNotQuery, getShouldQuery, MustNotQueryBody, ShouldQuery } from 'lib/queries'

export type ShouldNotQuery<TDocument extends Document> = ShouldQuery<TDocument>

/**
 * Builds a `should` clause containing a `bool` query with a `must_not` condition.
 * This is a convenience wrapper that produces the Elasticsearch equivalent of
 * "should not match" — documents matching the inner clause are deprioritised rather
 * than excluded. To hard-exclude documents, use `getMustNotQuery` directly inside `getBoolQuery`.
 *
 * @param body - A single query clause or array of query clauses that should not match.
 * @returns A `ShouldNotQuery` (typed as `ShouldQuery`) wrapping a `bool.must_not` clause.
 */
export const getShouldNotQuery = <TDocument extends Document>(
    body: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>,
): ShouldNotQuery<TDocument> => getShouldQuery(getBoolQuery(getMustNotQuery(body)))
