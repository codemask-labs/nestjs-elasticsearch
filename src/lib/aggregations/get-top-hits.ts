import { Document, Key, Sort } from 'lib/common'

export type TopHitsAggregationOptions<TDocument extends Document> = {
    /**
     * @description The offset from the first result you want to fetch.
     */

    from?: number

    /**
     * @description How the top matching hits should be sorted. By default the hits are sorted by the score of the main query.
     */
    sort?: Array<Sort<TDocument>>

    /**
     * @description Specifies which fields to include in the returned hits. This helps in reducing the amount of data returned by including only the necessary fields.
     */
    includes?: Array<Key<TDocument>>
}

export type TopHitsAggregationBody<TDocument extends Document> = {
    size: number
    from?: number
    sort?: Array<Sort<TDocument>>
    _source?: TopHitsAggregationOptions<TDocument>
}

export type TopHitsAggregation<TDocument extends Document> = {
    top_hits: TopHitsAggregationBody<TDocument>
}

/**
 * Builds an Elasticsearch `top_hits` aggregation that returns the top matching documents
 * within each bucket of a parent aggregation. Useful for fetching representative documents
 * per group (e.g. the newest document per category).
 *
 * @param size - The maximum number of top hits to return per bucket. Defaults to `3`.
 * @param options - Optional settings including `from` (offset), `sort` (sort order), and `includes` (field projection).
 * @returns A `TopHitsAggregation` object ready to be included in a search request's `aggregations`.
 */
export const getTopHitsAggregation = <TDocument extends Document>(
    size: number = 3,
    options?: TopHitsAggregationOptions<TDocument>,
): TopHitsAggregation<TDocument> => {
    if (!options) {
        return {
            top_hits: { size },
        }
    }

    const { includes, ...params } = options
    const source =
        includes && includes.length > 0
            ? {
                  _source: {
                      includes,
                  },
              }
            : {}

    return {
        top_hits: { size, ...params, ...source },
    }
}
