import { Document, Key } from '../types';
export type ValueCountAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>;
};
export type ValueCountAggregation<TDocument extends Document> = {
    value_count: ValueCountAggregationBody<TDocument>;
};
export declare const getValueCountAggregation: <TDocument extends Document>(field: Key<TDocument>) => ValueCountAggregation<TDocument>;
