import { Document, Field, FieldType } from '../types';
export type RangeQueryOptions<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    format?: string;
    gt?: FieldType<TDocument, TKeyword>;
    gte?: FieldType<TDocument, TKeyword>;
    lt?: FieldType<TDocument, TKeyword>;
    lte?: FieldType<TDocument, TKeyword>;
};
export type RangeQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: RangeQueryOptions<TDocument, TKeyword>;
};
export type RangeQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    range: RangeQueryBody<TDocument, TKeyword>;
};
export declare const getRangeQuery: <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(field: TKeyword, options: RangeQueryOptions<TDocument, TKeyword>) => RangeQuery<TDocument, TKeyword>;
