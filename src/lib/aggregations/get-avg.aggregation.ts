import { Document, FieldKeyword } from 'lib/types'

export const getAvgAggregation = <TDocument extends Document>(field: FieldKeyword<TDocument>) => ({
    avg: { field }
})
