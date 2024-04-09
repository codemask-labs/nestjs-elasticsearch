import { Order } from 'lib/enums'
import { Document } from './document'
import { Fields } from './field'

export type Sort<TDocument extends Document> = {
    [X in keyof Fields<TDocument>]?: { order: Order }
}
