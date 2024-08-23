import { Document } from './document'
import { Key } from './key'
import { Keyword } from './keyword'

type ObjectKeys<T> = Extract<keyof T, string>
export type NestedKey<T> = {
    [K in ObjectKeys<T>]: T[K] extends Array<infer U>
        ? `${K}.${ObjectKeys<U>}` | `${K}.${ObjectKeys<U>}.keyword`
        : T[K] extends object
          ? `${K}` | `${K}.${NestedKey<T[K]>}` | `${K}.${NestedKey<T[K]>}.keyword`
          : `${K}` | `${K}.keyword`
}[ObjectKeys<T>]

export type Field<TDocument extends Document> = Key<TDocument> | Keyword<TDocument> | NestedKey<TDocument>
export type Fields<TDocument extends Document> = { [K in keyof TDocument as (K & string) | `${K & string}.keyword`]: TDocument[K] }
export type FieldType<TDocument extends Document, TField extends Key<TDocument> | Keyword<TDocument>> = TField extends keyof Fields<TDocument>
    ? Fields<TDocument>[TField]
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
export type NumericField<TDocument extends Document> = {
    [K in keyof TDocument]: Exclude<TDocument[K], undefined> extends number | null ? K : never
}[keyof TDocument]
export type ArrayOfObjectsField<TDocument extends Document> = {
    [K in keyof TDocument]: TDocument[K] extends Array<object | null> ? K : never
}[keyof TDocument]
