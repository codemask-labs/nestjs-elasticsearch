import { Order } from 'lib/enums'
import { Document } from './document'
import { Key } from './key'
import { Keyword } from './keyword'

export type Sort<TDocument extends Document> = {
    [X in Key<TDocument> | Keyword<TDocument>]?: { order: Order }
}
