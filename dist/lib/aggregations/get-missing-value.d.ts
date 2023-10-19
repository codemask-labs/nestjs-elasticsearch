import { Document, Key } from '../types';
export type MissingValueAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>;
};
export type MissingValueAggregation<TDocument extends Document> = {
    missing: MissingValueAggregationBody<TDocument>;
};
export declare const getMissingValueAggregation: <TDocument extends Document>(field: Key<TDocument>) => MissingValueAggregation<TDocument>;
