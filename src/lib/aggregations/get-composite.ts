import { Document, Key, Keys } from 'lib/common'
import { TermsAggregation } from './get-terms'
import { HistogramAggregation } from './get-histogram'
import { DateHistogramAggregation } from '.'

export type AfterKey<TDocument extends Document> = {
    [TKey in Key<TDocument>]?: Keys<TDocument>[TKey]
}

export type CompositeAggregationList<TDocument extends Document> =
    | TermsAggregation<TDocument>
    | HistogramAggregation<TDocument>
    | DateHistogramAggregation<TDocument>
// todo: add geotile_grid aggregation

export type CompositeAggregationOptions<TDocument extends Document> = {
    size?: number
    after?: AfterKey<TDocument>
}

export type CompositeAggregationSource<TDocument extends Document> = {
    [x: string]: CompositeAggregationList<TDocument>
}

export type CompositeAggregationBody<TDocument extends Document> = CompositeAggregationOptions<TDocument> & {
    sources: Array<CompositeAggregationSource<TDocument>>
}

export type CompositeAggregation<TDocument extends Document> = {
    composite: CompositeAggregationBody<TDocument>
}

export const getCompositeAggregation = <TDocument extends Document>(
    sources: Array<CompositeAggregationSource<TDocument>>,
    options?: CompositeAggregationOptions<TDocument>
): CompositeAggregation<TDocument> => ({
    composite: { sources, ...options }
})
