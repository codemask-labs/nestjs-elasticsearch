import { Document, ArrayOfObjectsField } from 'lib/common'

export type NestedAggregationBody<TDocument extends Document> = {
    path: ArrayOfObjectsField<TDocument>
}

export type NestedAggregation<TDocument extends Document> = {
    nested: NestedAggregationBody<TDocument>
}

export const getNestedAggregation = <TDocument extends Document>(path: ArrayOfObjectsField<TDocument>): NestedAggregation<TDocument> => ({
    nested: {
        path,
    },
})
