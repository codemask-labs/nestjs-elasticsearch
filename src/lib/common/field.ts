import { Document } from './document'
import { Key } from './key'
import { Keyword } from './keyword'

type NumericKey<TDocument extends Document> = {
    [K in keyof TDocument]: Exclude<TDocument[K], undefined> extends number | null ? K : never
}[keyof TDocument]

type ObjectKeys<T> = Extract<keyof T, string>

type NestedKey<T> = {
    [K in ObjectKeys<T>]: T[K] extends Array<infer U>
        ? `${K}.${ObjectKeys<U>}` | `${K}.${ObjectKeys<U>}.keyword`
        : T[K] extends object
          ? `${K}` | `${K}.${NestedKey<T[K]>}` | `${K}.${NestedKey<T[K]>}.keyword`
          : `${K}` | `${K}.keyword`
}[ObjectKeys<T>]

type NestedNumericKey<T> = {
    [K in ObjectKeys<T>]: T[K] extends Array<infer U>
        ? U extends object
            ? `${K}.${NestedNumericKey<U>}`
            : U extends number | null
              ? `${K}`
              : never
        : T[K] extends object
          ? `${K}.${NestedNumericKey<T[K]>}`
          : T[K] extends number | null
            ? `${K}`
            : never
}[ObjectKeys<T>]

export type Field<TDocument extends Document> = Key<TDocument> | Keyword<TDocument> | NestedKey<TDocument>

export type Fields<TDocument extends Document> = { [K in keyof TDocument as (K & string) | `${K & string}.keyword`]: TDocument[K] }

export type FieldType<TDocument extends Document, TField extends Key<TDocument> | Keyword<TDocument>> = TField extends keyof Fields<TDocument>
    ? Fields<TDocument>[TField]
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any

export type NullableFieldType<TDocument extends Document, TField extends Key<TDocument> | Keyword<TDocument>> = TField extends keyof Fields<TDocument>
    ? Fields<TDocument>[TField] | null | undefined
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any

export type NumericField<TDocument extends Document> = NumericKey<TDocument> | NestedNumericKey<TDocument>

export type ArrayOfObjectsField<TDocument extends Document> = {
    [K in keyof TDocument]: TDocument[K] extends Array<object | null> ? K : never
}[keyof TDocument]
