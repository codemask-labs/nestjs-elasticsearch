import { Document, Key } from 'lib/types'

export type MissingValueAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>
}

export type MissingValueAggregation<TDocument extends Document> = {
    missing: MissingValueAggregationBody<TDocument>
}

export const getMissingValueAggregation = <TDocument extends Document>(field: Key<TDocument>): MissingValueAggregation<TDocument> => ({
    missing: { field }
})
