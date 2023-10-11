import { Document, Key } from 'lib/types'

export type ValueCountAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
}

export type ValueCountAggregation<TDocument extends Document> = {
    value_count: ValueCountAggregationBody<TDocument>
}

export const getValueCountAggregation = <TDocument extends Document>(field: Key<TDocument>): ValueCountAggregation<TDocument> => ({
    // eslint-disable-next-line camelcase
    value_count: { field }
})
