import { Document } from 'lib/types'
import { Catalog } from 'nestjs/injectables'

export class QueryBuilder<TDocument extends Document> {
    constructor(
        private readonly catalog: Catalog<TDocument>
    ) {}
}
