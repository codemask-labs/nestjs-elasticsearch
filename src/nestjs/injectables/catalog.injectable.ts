import { Injectable } from '@nestjs/common'
import { ElasticsearchService as ElasticsearchBaseService } from '@nestjs/elasticsearch'
import { ClassConstructor, Document, ElasticsearchCatalog } from 'lib/types'
import { QueryBuilder } from 'lib/builders'

@Injectable()
export class Catalog<TDocument extends Document> implements ElasticsearchCatalog {
    constructor(
        private readonly elasticsearchBaseService: ElasticsearchBaseService,
        private readonly document: ClassConstructor<TDocument>
    ) {}

    search() {}

    createQueryBuilder() {
        return new QueryBuilder(this)
    }

    checkDocumentIntegrity() {
        // todo: pull schema and example values from the index
        // note: this can be potentially expensive operation, but we can make it cheap:
        // - check if fields contains null values and check if document is marked to be nullable
        // - better yet find documents with annomalies, that would cause the schema to break
        // for example:
        // check and pull all kind of fields that are available on the elasticsearch catalog
        // select document fields and each value
        // warn or error when field is either:
        // 1. `null and not marked as optional in the schema`
        // 2. `number/string/date/geopoint and not marked in the schema`
        // 3. `check if document contains all fields on the source, or source contains all the fields in the document`
    }
}
