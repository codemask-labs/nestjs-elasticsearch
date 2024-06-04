import { Document, NumericField } from 'lib/common'

export type PercentileAggregationBody<TDocument extends Document> = {
    field: NumericField<TDocument>
    percents: Array<number>
}

export type PercentileAggregation<TDocument extends Document> = {
    percentiles: PercentileAggregationBody<TDocument>
}

export const getPercentileAggregation = <TDocument extends Document>(
    field: NumericField<TDocument>,
    percents: Array<number>
): PercentileAggregation<TDocument> => ({
    percentiles: {
        field,
        percents
    }
})
