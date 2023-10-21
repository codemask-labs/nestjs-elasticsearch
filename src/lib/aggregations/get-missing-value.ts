import { Document, Key } from 'lib/common'

export type MissingValueAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
}

export type MissingValueAggregation<TDocument extends Document> = {
    missing: MissingValueAggregationBody<TDocument>
}

export const getMissingValueAggregation = <TDocument extends Document>(field: Key<TDocument>): MissingValueAggregation<TDocument> => ({
    missing: { field }
})
