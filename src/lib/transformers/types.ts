import { Bucket, Buckets, CompositeBuckets, Document, Hits, OptionalValue, Value } from 'lib/common'
import {
    Aggregations,
    AggregationsBody,
    AggregationsContainer,
    AvgAggregation,
    CardinalityAggregation,
    CompositeAggregation,
    DateHistogramAggregation,
    MaxAggregation,
    MinAggregation,
    SumAggregation,
    TermsAggregation,
    TopHitsAggregation,
    ValueCountAggregation
} from 'lib/aggregations'

export type TransformAggregation<
    TDocument extends Document,
    TName extends string | number | symbol,
    TAggregation extends Aggregations<TDocument>,
    TAggregationsBody extends AggregationsBody<TDocument, AggregationsContainer<TDocument>>
> = TAggregation extends TermsAggregation<TDocument> | DateHistogramAggregation<TDocument>
    ? Buckets<string, Bucket & TransformedAggregations<TDocument, TAggregationsBody>>
    : TAggregation extends TopHitsAggregation<TDocument>
        ? Hits<TDocument>
        : TAggregation extends AvgAggregation<TDocument>
            ? OptionalValue<number>
            : TAggregation extends
            | CardinalityAggregation<TDocument>
            | ValueCountAggregation<TDocument>
            | MaxAggregation<TDocument>
            | MinAggregation<TDocument>
            | SumAggregation<TDocument>
                ? Value<number>
                : TAggregation extends CompositeAggregation<TDocument>
                    ? CompositeBuckets
                    : `Unhandled aggregation type for name: ${TName & string}`

export type TransformedAggregation<
    TDocument extends Document,
    TName extends string | number | symbol,
    TAggregations extends Aggregations<TDocument>
> =
    TAggregations['aggregations'] extends AggregationsContainer<TDocument>
        ? TransformAggregation<TDocument, TName, TAggregations, TAggregations['aggregations']>
        : TAggregations['aggs'] extends AggregationsContainer<TDocument>
            ? TransformAggregation<TDocument, TName, TAggregations, TAggregations['aggs']>
            : TransformAggregation<TDocument, TName, TAggregations, AggregationsContainer<TDocument>>

export type TransformedAggregations<TDocument extends Document, TAggregationsBody extends AggregationsContainer<TDocument>> = {
    [Name in keyof TAggregationsBody]: TransformedAggregation<TDocument, Name, TAggregationsBody[Name]>
}
