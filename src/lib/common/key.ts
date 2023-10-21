import { Document } from './document'

export type Key<TDocument extends Document> = keyof TDocument & string
export type Keys<TDocument extends Document> = { [K in keyof TDocument as K & string]: TDocument[K] }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyType<TDocument extends Document, TKey extends Key<TDocument>> = TKey extends keyof Keys<TDocument> ? Keys<TDocument>[TKey] : any
