import { estypes } from '@elastic/elasticsearch'
import { Document } from './document'

export type Hits<TDocument extends Document> = {
    hits: estypes.HitsMetadata<TDocument>
}
