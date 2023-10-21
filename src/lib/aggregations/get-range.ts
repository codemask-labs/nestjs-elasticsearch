import { Range, Document, Key } from 'lib/types'

export type RangeAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
    ranges: Array<Range>
}

export type RangeAggregation<TDocument extends Document> = {
    range: RangeAggregationBody<TDocument>
}

export const getRangeAggregation = <TDocument extends Document>(
    field: Key<TDocument>,
    ranges: Array<Range>
): RangeAggregation<TDocument> => ({
    range: {
        field,
        ranges
    }
})
