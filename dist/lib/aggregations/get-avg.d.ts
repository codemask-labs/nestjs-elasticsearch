import { Document, Key } from '../types';
export type AvgAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>;
};
export type AvgAggregation<TDocument extends Document> = {
    avg: AvgAggregationBody<TDocument>;
};
export declare const getAvgAggregation: <TDocument extends Document>(field: Key<TDocument>) => AvgAggregation<TDocument>;
