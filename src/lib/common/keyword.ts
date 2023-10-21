import { Document } from './document'
import { Key } from './key'

export type Keyword<TDocument extends Document> = `${Key<TDocument>}.keyword`
export type Keywords<TDocument extends Document> = { [K in keyof TDocument as `${K & string}.keyword`]: TDocument[K] }
export type KeywordType<TDocument extends Document, TKeyword extends Keyword<TDocument>> = TKeyword extends keyof Keywords<TDocument>
    ? Keywords<TDocument>[TKeyword]
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
