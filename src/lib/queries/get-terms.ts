import { Document, FieldKeyword, FieldType } from 'lib/types'

/**
 *
 * @param field
 * @param values
 * @returns
 */
export const getTermsQuery = <TDocument extends Document>(field: FieldKeyword<TDocument>, values: Array<FieldType<TDocument, typeof field>>) => ({
    terms: {
        [field]: values
    }
})
