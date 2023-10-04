import { Document, FieldKeyword, FieldType } from 'lib/types'

export const getTermQuery = <TDocument extends Document>(field: FieldKeyword<TDocument>, value: FieldType<TDocument, typeof field>) => ({
    term: {
        [field]: { value }
    }
})
