// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassConstructor<T> = new (...args: Array<any>) => T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Document = Record<string, any>

export type Field<TDocument extends Document> = keyof TDocument
export type FieldType<TDocument extends Document, TKey extends Field<TDocument>> = TKey extends Field<TDocument> ? TDocument[TKey] : never
export type Keyword<TDocument extends Document, TField extends Field<TDocument>> = TField | `${TField & string}.keyword`
