import { ApiResponse } from '@elastic/elasticsearch';
import { HitsMetadata } from '@elastic/elasticsearch/api/types';
import { ClassConstructor, Document } from '../types';
import { Aggregations, AggregationsBody } from '..';
export type ElasticsearchResult<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    hits: HitsMetadata<TDocument>;
    aggregations?: AggregationsBody<TDocument, TAggregationsBody>;
};
export type SearchResponse<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    documents: Array<TDocument>;
    aggregations: AggregationsBody<TDocument, TAggregationsBody>;
};
export declare const getSearchResponse: <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(document: ClassConstructor<TDocument>, { body }: ApiResponse<ElasticsearchResult<TDocument, TAggregationsBody>, unknown>) => SearchResponse<TDocument, TAggregationsBody>;
