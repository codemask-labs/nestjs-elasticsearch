import { Document, FieldKeyword } from 'lib/types'

export const getSumAggregation = <TDocument extends Document>(field: FieldKeyword<TDocument>) => ({
    sum: { field }
})
