import { Document } from '../types';
import { TermQuery } from './get-term';
import { TermsQuery } from './get-terms';
import { BoolQuery } from './get-bool';
export type MustNotQueryBody<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument> | BoolQuery<TDocument>;
export type MustNotQuery<TDocument extends Document> = {
    must_not?: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>;
};
export declare const getMustNotQuery: <TDocument extends Document>(mustNot: MustNotQueryBody<TDocument> | MustNotQueryBody<TDocument>[]) => MustNotQuery<TDocument>;
