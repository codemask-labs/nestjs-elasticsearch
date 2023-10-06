import { Injectable } from '@nestjs/common'
import { ElasticsearchService as ElasticsearchBaseService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document } from 'lib/types'
import { SearchOptions, getSearchRequest, getSearchResponse } from 'lib/elasticsearch'
import { Catalog } from './injectables'
import { ELASTICSEARCH_CATALOG_NAME } from 'lib/constants'

@Injectable()
export class ElasticsearchService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly catalogs: Array<Catalog<any>> = []

    constructor(private readonly elasticsearchBaseService: ElasticsearchBaseService) {}

    checkCatalogsIntegrity() {
        // todo: get the catalog schema and compare it with elasticsearch catalog field types
        // note: ideal for situations where we want to run regression tests and ensure data integrity of the service and datasource

        return Promise.allSettled(this.catalogs.map(catalog => catalog.checkDocumentIntegrity()))
    }

    withCatalog<TDocument extends Document>(catalogDocument: ClassConstructor<TDocument>) {
        return new Catalog(this.elasticsearchBaseService, catalogDocument)
    }

    search<TDocument extends Document>(catalogDocument: ClassConstructor<TDocument>, options: SearchOptions<TDocument>) {
        const index = Reflect.getMetadata(ELASTICSEARCH_CATALOG_NAME, catalogDocument)

        if (!index) {
            throw new Error(`Failed to find Catalog Index`)
        }

        const request = getSearchRequest<TDocument>(index, options)

        return this.elasticsearchBaseService.search(request)
            .then(getSearchResponse(request))
            .catch(error => {
                console.error(error)

                throw new Error('Elasticsearch request has failed')
            })
    }
}
