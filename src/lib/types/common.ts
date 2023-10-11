// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassConstructor<T> = new (...args: Array<any>) => T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Document = Record<string, any>

export type Field<TDocument extends Document> = keyof TDocument
export type FieldType<TDocument extends Document, TField extends Field<TDocument>> = TDocument[TField]
// todo: fix type to check only keyword
export type Keyword<TDocument extends Document> = (Field<TDocument> & string) | `${Field<TDocument> & string}.keyword`
export type KeywordFields<TDocument extends Document> = { [K in keyof TDocument as K | `${K & string}.keyword`]: TDocument[K] }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeywordType<TDocument extends Document, TKeyword extends Keyword<TDocument>> = TKeyword extends keyof KeywordFields<TDocument> ? KeywordFields<TDocument>[TKeyword] : any
