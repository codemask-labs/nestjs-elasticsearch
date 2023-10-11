/* eslint-disable @typescript-eslint/no-explicit-any */
export type ClassConstructor<T> = new (...args: Array<any>) => T

export type Document = Record<string, any>

export type Key<TDocument extends Document> = keyof TDocument & string
export type Keyword<TDocument extends Document> = `${Key<TDocument>}.keyword`
export type Field<TDocument extends Document> = Key<TDocument> | Keyword<TDocument>

export type Keys<TDocument extends Document> = { [K in keyof TDocument as K & string]: TDocument[K] }
export type Keywords<TDocument extends Document> = { [K in keyof TDocument as `${K & string}.keyword`]: TDocument[K] }
export type Fields<TDocument extends Document> = { [K in keyof TDocument as K & string | `${K & string}.keyword`]: TDocument[K] }

export type KeyType<TDocument extends Document, TKey extends Key<TDocument>> = TKey extends keyof Keys<TDocument> ? Keys<TDocument>[TKey] : any
export type KeywordType<TDocument extends Document, TKeyword extends Keyword<TDocument>> = TKeyword extends keyof Keywords<TDocument> ? Keywords<TDocument>[TKeyword] : any
export type FieldType<TDocument extends Document, TField extends Key<TDocument> | Keyword<TDocument>> = TField extends keyof Fields<TDocument> ? Fields<TDocument>[TField] : any
