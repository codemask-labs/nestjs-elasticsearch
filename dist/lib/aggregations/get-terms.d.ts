import { Document, Field } from '../types';
export type TermsAggregationBody<TDocument extends Document> = {
    field: Field<TDocument>;
    size: number;
};
export type TermsAggregation<TDocument extends Document> = {
    terms: TermsAggregationBody<TDocument>;
};
export declare const getTermsAggregation: <TDocument extends Document>(field: Field<TDocument>, size?: number) => TermsAggregation<TDocument>;
