import { Document, Field } from 'lib/common'

export type ValueCountAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type ValueCountAggregation<TDocument extends Document> = {
    value_count: ValueCountAggregationBody<TDocument>
}

export const getValueCountAggregation = <TDocument extends Document>(field: Field<TDocument>): ValueCountAggregation<TDocument> => ({
    value_count: {
        field
    }
})
