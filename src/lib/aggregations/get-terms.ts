import { Document, Keyword } from 'lib/types'

export type TermsAggregationBody<TDocument extends Document> = {
    field: Keyword<TDocument>,
    size: number
}

export type TermsAggregation<TDocument extends Document> = {
    terms: TermsAggregationBody<TDocument>
}

export const getTermsAggregation = <TDocument extends Document>(field: Keyword<TDocument>, size: number = 10): TermsAggregation<TDocument> => ({
    terms: {
        field,
        size
    }
})

