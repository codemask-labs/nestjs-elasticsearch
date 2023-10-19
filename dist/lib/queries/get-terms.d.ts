import { Document, Field, FieldType } from '../types';
type TermsQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: Array<FieldType<TDocument, TKeyword>>;
};
export type TermsQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    terms: TermsQueryBody<TDocument, TKeyword>;
};
export declare const getTermsQuery: <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(field: TField, values?: FieldType<TDocument, TField>[] | undefined) => TermsQuery<TDocument, TField>;
export {};
