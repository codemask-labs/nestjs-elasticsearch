import { ClassConstructor, Document, ElasticsearchIndex } from '../../lib/types';
import { SearchRequest } from '../../lib/elasticsearch';
import { ElasticsearchService } from '..';
import { Aggregations } from '../../lib/aggregations';
export declare class Index<TDocument extends Document> implements ElasticsearchIndex<TDocument> {
    private readonly service;
    private readonly document;
    constructor(service: ElasticsearchService, document: ClassConstructor<TDocument>);
    search<TAggregationsBody extends Record<string, Aggregations<TDocument>>>(options?: SearchRequest<TDocument, TAggregationsBody>): Promise<import("../../lib/elasticsearch").SearchResponse<TDocument, TAggregationsBody>>;
}
