import { ElasticsearchService as ElasticsearchBaseService } from '@nestjs/elasticsearch';
import { ClassConstructor, Document } from '../lib/types';
import { SearchRequest } from '../lib/elasticsearch';
import { Index } from './injectables';
import { AggregationList } from '../lib/aggregations';
export declare class ElasticsearchService {
    private readonly elasticsearchBaseService;
    constructor(elasticsearchBaseService: ElasticsearchBaseService);
    search<TDocument extends Document, TAggregationsBody extends Record<string, AggregationList<TDocument>>>(document: ClassConstructor<TDocument>, options?: SearchRequest<TDocument, TAggregationsBody>): Promise<import("../lib/elasticsearch").SearchResponse<TDocument, TAggregationsBody>>;
    getIndex<TDocument extends Document>(document: ClassConstructor<TDocument>): Index<TDocument>;
}
