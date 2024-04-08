import { Document, Key, Sort } from 'lib/common'

export type TopHitsAggregationOptions<TDocument extends Document> = {
    from?: number
    includes?: Array<Key<TDocument>>
    sort?: Array<Sort<TDocument>>
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
