import { AggregationRange, Document, Field } from 'lib/types'

export type RangeAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>,
    ranges: Array<AggregationRange>
}

export type RangeAggregation<TDocument extends Document> = {
    range: RangeAggregationBody<TDocument>
}

export const getRangeAggregation = <TDocument extends Document>(field: Field<TDocument>, ranges: Array<AggregationRange>): RangeAggregation<TDocument> => ({
    range: {
        field,
        ranges
    }
})
