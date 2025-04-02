import { Document, Field } from 'lib/common'

export type MissingValueAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
}

export type MissingValueAggregation<TDocument extends Document> = {
    missing: MissingValueAggregationBody<TDocument>
}

export const getMissingValueAggregation = <TDocument extends Document>(field: Field<TDocument>): MissingValueAggregation<TDocument> => ({
    missing: { field },
})
