import { Document, Field, Key } from '../types';
export type SumAggregationBody<TDocument extends Document> = {
    field: Key<TDocument>;
};
export type SumAggregation<TDocument extends Document> = {
    sum: SumAggregationBody<TDocument>;
};
export declare const getSumAggregation: <TDocument extends Document, TField extends Field<TDocument>>(field: TField) => SumAggregation<TDocument>;
