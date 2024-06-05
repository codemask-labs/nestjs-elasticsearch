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

export const getTopHitsAggregation = <TDocument extends Document>(
    size: number = 3,
    options?: TopHitsAggregationOptions<TDocument>
): TopHitsAggregation<TDocument> => {
    if (!options) {
        return {
            // eslint-disable-next-line camelcase
            top_hits: { size }
        }
    }

    const { includes, ...params } = options
    const source = includes?.length ? { _source: { includes } } : {}

    return {
        // eslint-disable-next-line camelcase
        top_hits: { size, ...params, ...source }
    }
}
