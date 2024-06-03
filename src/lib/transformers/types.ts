import { estypes } from '@elastic/elasticsearch'
import { Bucket, Buckets, CompositeBuckets, Document, Hits, OptionalValue, RangeBucket, Value } from 'lib/common'
import {
    Aggregations,
    AggregationsBody,
    AggregationsContainer,
    AvgAggregation,
    CardinalityAggregation,
    CompositeAggregation,
    DateHistogramAggregation,
    HistogramAggregation,
    MaxAggregation,
    MinAggregation,
    MissingValueAggregation,
    PercentileAggregation,
    RangeAggregation,
    StatsBucketAggregation,
    SumAggregation,
    TermsAggregation,
    TopHitsAggregation,
    ValueCountAggregation
} from 'lib/aggregations'
import { MissingValueAggregationResponse } from 'lib/responses'

export type TransformAggregation<
    TDocument extends Document,
    TName extends string | number | symbol,
    TAggregation extends Aggregations<TDocument>,
    TAggregationsBody extends AggregationsBody<TDocument, AggregationsContainer<TDocument>>
> = TAggregation extends TermsAggregation<TDocument> | DateHistogramAggregation<TDocument> | HistogramAggregation<TDocument>
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
            : TAggregation extends StatsBucketAggregation
              ? estypes.StatsAggregate
              : TAggregation extends PercentileAggregation<TDocument>
                ? estypes.TDigestPercentilesAggregate
                : TAggregation extends RangeAggregation<TDocument>
                  ? Buckets<string, RangeBucket & TransformedAggregations<TDocument, TAggregationsBody>>
                  : TAggregation extends MissingValueAggregation<TDocument>
                    ? MissingValueAggregationResponse
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
