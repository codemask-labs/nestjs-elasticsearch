// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ClassConstructor<T> = new (...args: Array<any>) => T

export type Document = {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    [Key: string]: any
}

export type FieldKeywords<TDocument extends Document> = {
    [K in keyof TDocument as K | `${K & string}.keyword`]: TDocument[K]
}

// export type KeywordFields<Schema extends Class> = { [K in keyof InstanceType<Schema> as K | `${K & string}.keyword`]: InstanceType<Schema>[K] }

export type FieldKeyword<TDocument extends Document> = (keyof TDocument & string) | `${keyof TDocument & string}.keyword`

export type FieldType<TDocument extends Document, Key extends string | number | symbol> = Key extends keyof FieldKeywords<TDocument> ? FieldKeywords<TDocument>[Key] : never