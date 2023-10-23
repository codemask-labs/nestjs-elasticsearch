import { Bucket, Buckets, Document, OptionalValue, Value } from 'lib/common'
import { Aggregations, AggregationsBody, AvgAggregation, CardinalityAggregation, SumAggregation, TermsAggregation, ValueCountAggregation } from 'lib/aggregations'

export type TransformAggregation<
    TDocument extends Document,
    TName extends string,
    TAggregation extends Aggregations<TDocument>,
    TAggregationsBody extends AggregationsBody<TDocument, Record<string, Aggregations<TDocument>>>
> = TAggregation extends TermsAggregation<TDocument>
    ? Buckets<Bucket & TransformedAggregations<TDocument, TAggregationsBody>>
    : TAggregation extends AvgAggregation<TDocument> | SumAggregation<TDocument>
        ? OptionalValue<number>
        : TAggregation extends CardinalityAggregation<TDocument> | ValueCountAggregation<TDocument>
            ? Value<number>
            : `Unhandled aggregation type for name: ${TName}`

export type TransformedAggregation<
    TDocument extends Document,
    TName extends string,
    TAggregations extends Aggregations<TDocument>
> = TAggregations['aggregations'] extends Record<string, Aggregations<TDocument>>
    ? TransformAggregation<TDocument, TName, TAggregations, TAggregations['aggregations']>
    : TAggregations['aggs'] extends Record<string, Aggregations<TDocument>>
        ? TransformAggregation<TDocument, TName, TAggregations, TAggregations['aggs']>
        : TransformAggregation<TDocument, TName, TAggregations, Record<string, Aggregations<TDocument>>>

export type TransformedAggregations<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    [Name in keyof TAggregationsBody]: TransformedAggregation<TDocument, Name & string, TAggregationsBody[Name]>
}
