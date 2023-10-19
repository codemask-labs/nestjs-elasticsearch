import { Search } from '@elastic/elasticsearch/api/requestParams';
import { Document } from '../types';
import { Aggregations, BoolQuery } from '..';
export type SearchRequest<TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>> = {
    size?: number;
    from?: number;
    query?: BoolQuery<TDocument>;
    aggregations?: TAggregationsBody;
};
export declare const getSearchRequest: <TDocument extends Document, TAggregationsBody extends Record<string, Aggregations<TDocument>>>(index: string, options?: SearchRequest<TDocument, TAggregationsBody> | undefined) => Search<Record<string, any>>;
