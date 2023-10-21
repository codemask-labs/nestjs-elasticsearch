import { Document, Key, Sort } from 'lib/common'

export type TopHitsAggregationOptions<TDocument extends Document> = {
    sort?: Array<Sort<TDocument>>
    includes?: Array<Key<TDocument>>
}

export type TopHitsAggregationBody<TDocument extends Document> = {
    size: number
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

    return {
        // eslint-disable-next-line camelcase
        top_hits: { size, _source: { ...options } }
    }
}
