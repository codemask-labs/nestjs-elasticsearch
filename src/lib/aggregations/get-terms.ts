import { Document, Field } from 'lib/common'
import { MissingOrder, Order } from 'lib/enums'

export type TermsAggregationOrder = {
    [x: string]: Order
}

export type TermsAggregationOptions = {
    /**
     * @description For composite aggregation terms ordering use {Order} enum. For other terms aggregation use {TermsAggregationOrder}
     */
    order?: TermsAggregationOrder | Order
    /**
     * @requires CompositeAggregation
     * @description By default documents without a value for a given source are ignored. It is possible to include them in the response by setting missing_bucket to true (defaults to false)
     */
    missing_bucket?: boolean
    /**
     * @requires CompositeAggregation
     * @description You can control the position of the null bucket using the optional missing_order parameter. If missing_order is first or last, the null bucket is placed in the respective first or last position. If missing_order is omitted or default, the source’s order determines the bucket’s position. If order is asc (ascending), the bucket is in the first position. If order is desc (descending), the bucket is in the last position.
     */
    missing_order?: MissingOrder
}

export type TermsAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>
    size?: number
    order?: TermsAggregationOrder | Order
    missing_bucket?: boolean
    missing_order?: MissingOrder
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
