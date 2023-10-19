import { SearchRequest, SearchResponse } from '../elasticsearch';
import { Document } from './common';
import { Aggregations } from '..';
export type ElasticsearchIndex<TDocument extends Document> = {
    search: <TAggregationsBody extends Record<string, Aggregations<TDocument>>>(options?: SearchRequest<TDocument, TAggregationsBody>) => Promise<SearchResponse<TDocument, TAggregationsBody>>;
};
