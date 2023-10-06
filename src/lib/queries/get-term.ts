import { Document, FieldKeyword, FieldType } from 'lib/types'

/**
 *
 * @param field
 * @param value
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermQuery = <TDocument extends Document>(field: FieldKeyword<TDocument>, value: FieldType<TDocument, typeof field>) => ({
    term: {
        [field]: { value }
    }
})
