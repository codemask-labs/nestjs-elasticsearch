import { AggregationRange, Document, Key } from '../types';
export type RangeAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>;
    ranges: Array<AggregationRange>;
};
export type RangeAggregation<TDocument extends Document> = {
    range: RangeAggregationBody<TDocument>;
};
export declare const getRangeAggregation: <TDocument extends Document>(field: Key<TDocument>, ranges: Array<AggregationRange>) => RangeAggregation<TDocument>;
