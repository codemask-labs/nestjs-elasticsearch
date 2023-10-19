import { Document, Field } from 'lib/types'

export type TermsAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>,
    size: number
}

export type TermsAggregation<TDocument extends Document> = {
    terms: TermsAggregationBody<TDocument>
}

export const getTermsAggregation = <TDocument extends Document, TField extends Field<TDocument>>(field: TField, size: number = 10): TermsAggregation<TDocument> => ({
    terms: {
        field,
        size
    }
})

