import { Document, Key } from 'lib/common'

export type PercentAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    percents: Array<number>
}

export type PercentAggregation<TDocument extends Document> = {
    percentiles: PercentAggregationBody<TDocument>
}

export const getPercentAggregation = <TDocument extends Document>(
    field: Key<TDocument>,
    percents: Array<number>
): PercentAggregation<TDocument> => ({
    percentiles: {
        field,
        percents
    }
})
