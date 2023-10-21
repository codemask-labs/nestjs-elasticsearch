import { Document } from './document'
import { Key } from './key'
import { Keyword } from './keyword'

export type Field<TDocument extends Document> = Key<TDocument> | Keyword<TDocument>
export type Fields<TDocument extends Document> = { [K in keyof TDocument as (K & string) | `${K & string}.keyword`]: TDocument[K] }
export type FieldType<TDocument extends Document, TField extends Key<TDocument> | Keyword<TDocument>> = TField extends keyof Fields<TDocument>
    ? Fields<TDocument>[TField]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : any
