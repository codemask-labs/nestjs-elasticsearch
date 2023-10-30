import { Document, Key } from 'lib/common'

export type PercentileAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    percentiles: Array<number>
}

export type PercentileAggregation<TDocument extends Document> = {
    percentiles: PercentileAggregationBody<TDocument>
}

export const getPercentileAggregation = <TDocument extends Document>(
    field: Key<TDocument>,
    percentiles: Array<number>
): PercentileAggregation<TDocument> => ({
    percentiles: {
        field,
        percentiles
    }
})
