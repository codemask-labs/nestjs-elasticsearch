import { Document, Key } from 'lib/types'

export type PercentileAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    percents: Array<number>
}

export type PercentileAggregation<TDocument extends Document> = {
    percentiles: PercentileAggregationBody<TDocument>
}

export const getPercentileAggregation = <TDocument extends Document>(
    field: Key<TDocument>,
    percents: Array<number>
): PercentileAggregation<TDocument> => ({
    percentiles: {
        field,
        percents
    }
})
