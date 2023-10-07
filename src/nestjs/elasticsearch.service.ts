import { Injectable } from '@nestjs/common'
import { ElasticsearchService as ElasticsearchBaseService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document } from 'lib/types'
import { ELASTICSEARCH_CATALOG_NAME } from 'lib/constants'
import { ElasticsearchResult, SearchOptions, getSearchRequest, getSearchResponse } from 'lib/elasticsearch'
import { Catalog } from './injectables'

@Injectable()
export class ElasticsearchService {
    constructor(private readonly elasticsearchBaseService: ElasticsearchBaseService) {}

    search<TDocument extends Document>(document: ClassConstructor<TDocument>, options: SearchOptions<TDocument>) {
        const index = Reflect.getMetadata(ELASTICSEARCH_CATALOG_NAME, document)

        if (!index) {
            throw new Error(`Failed to find Catalog Index`)
        }

        const request = getSearchRequest<TDocument>(index, options)

        return this.elasticsearchBaseService.search<ElasticsearchResult<TDocument>>(request)
            .then(response => getSearchResponse(document, response))
    }

    getCatalog<TDocument extends Document>(document: ClassConstructor<TDocument>) {
        return new Catalog(this, document)
    }
}
