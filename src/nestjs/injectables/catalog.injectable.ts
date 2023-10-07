import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document, ElasticsearchCatalog } from 'lib/types'
import { QueryBuilder } from 'lib/builders'
import { ELASTICSEARCH_CATALOG_NAME } from 'lib/constants'
import { SearchOptions } from 'lib/elasticsearch'
import { ElasticsearchService } from '..'

@Injectable()
export class Catalog<TDocument extends Document> implements ElasticsearchCatalog<TDocument> {
    private readonly index: string

    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>
    ) {
        this.index = Reflect.getMetadata(ELASTICSEARCH_CATALOG_NAME, document)
    }

    search(options: SearchOptions<TDocument>) {
        return this.service.search(this.document, options)
            .catch(error => {
                console.error(error)

                throw new Error('Elasticsearch request has failed')
            })
    }

    createQueryBuilder() {
        return new QueryBuilder<TDocument>(this)
    }
}
