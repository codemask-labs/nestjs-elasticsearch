import { Range, Document, Key } from 'lib/common'

export type RangeAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    ranges: Array<Range>
}

export type RangeAggregation<TDocument extends Document> = {
    range: RangeAggregationBody<TDocument>
}

export const getRangeAggregation = <TDocument extends Document>(field: Key<TDocument>, ranges: Array<Range>): RangeAggregation<TDocument> => ({
    range: {
        field,
        ranges
    }
})
