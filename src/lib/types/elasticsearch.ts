import { Key } from 'lib/types'
import { Order } from 'lib/enums'
import { Document } from './common'

export type Range = {
    from?: number
    to?: number
}

export type Sort<TDocument extends Document> = {
    [X in Key<TDocument>]?: { order: Order }
}
