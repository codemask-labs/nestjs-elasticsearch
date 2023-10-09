import { Injectable } from '@nestjs/common'
import { ClassConstructor, Document, ElasticsearchIndex } from 'lib/types'
import { SearchRequest } from 'lib/elasticsearch'
import { ElasticsearchService } from '..'

@Injectable()
export class Index<TDocument extends Document> implements ElasticsearchIndex<TDocument> {
    constructor(
        private readonly service: ElasticsearchService,
        private readonly document: ClassConstructor<TDocument>
    ) {}

    search(options?: SearchRequest<TDocument>) {
        return this.service.search(this.document, options)
    }
}
