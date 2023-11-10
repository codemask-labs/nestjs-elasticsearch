import { Document, Field } from 'lib/common'
import { Order } from 'lib/enums'

export type TermsAggregationOrder = {
    [x: string]: Order
}

export type TermsAggregationOptions = {
    order?: TermsAggregationOrder
}

export type TermsAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
    size?: number
    order?: TermsAggregationOrder
}

export type TermsAggregation<TDocument extends Document> = {
    terms: TermsAggregationBody<TDocument>
}

export const getTermsAggregation = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField,
    size?: number,
    options?: TermsAggregationOptions
): TermsAggregation<TDocument> => ({
    terms: { field, size, ...options }
})
