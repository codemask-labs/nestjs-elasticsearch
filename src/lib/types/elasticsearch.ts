export type Document = {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
    [Key: string]: any
}

export type FieldKeyword<TDocument extends Document> = (keyof TDocument & string) | `${keyof TDocument & string}.keyword`

export type FieldType<TDocument extends Document, Key extends keyof TDocument> = TDocument[Key]