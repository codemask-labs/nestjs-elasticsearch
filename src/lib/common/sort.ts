import { Order } from 'lib/enums'
import { Document } from './document'
import { Key } from './key'

export type Sort<TDocument extends Document> = {
    [X in Key<TDocument>]?: { order: Order }
}
