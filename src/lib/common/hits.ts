import { SearchHitsMetadata } from '@elastic/elasticsearch/lib/api/types'
import { Document } from './document'

export type Hits<TDocument extends Document> = {
    hits: SearchHitsMetadata<TDocument>
}
