import { Injectable } from '@nestjs/common'
import { ElasticsearchService as ElasticsearchBaseService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document } from 'lib/types'
import { ELASTICSEARCH_INDEX_NAME_METADATA } from 'lib/constants'
import { ElasticsearchResult, SearchOptions, getSearchRequest, getSearchResponse } from 'lib/elasticsearch'
import { Index } from './injectables'

@Injectable()
export class ElasticsearchService {
    constructor(private readonly elasticsearchBaseService: ElasticsearchBaseService) {}

    search<TDocument extends Document>(document: ClassConstructor<TDocument>, options?: SearchOptions<TDocument>) {
        const index = Reflect.getMetadata(ELASTICSEARCH_INDEX_NAME_METADATA, document)

        if (!index) {
            throw new Error('Failed to find Index Name')
        }

        const request = getSearchRequest<TDocument>(index, options)

        return this.elasticsearchBaseService.search<ElasticsearchResult<TDocument>>(request).then(response => getSearchResponse(document, response))
    }

    getIndex<TDocument extends Document>(document: ClassConstructor<TDocument>) {
        return new Index(this, document)
    }
}
