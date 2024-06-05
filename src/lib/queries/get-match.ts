import { Document, Field, FieldType } from 'lib/common'

export type MatchQueryOptions = {
    /**
     * @description Increases the importance of that query clause relative to others, affecting the relevance scoring of documents.
     */
    boost?: number

    /**
     * @description Number of beginning characters left unchanged for fuzzy matching. Defaults to 0.
     */
    prefix_length?: number

    /**
     * @description Enables approximate matching for string queries, useful for handling typos or variations in spelling.
     */
    fuzziness?: string
}

export type MatchQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: { query: FieldType<TDocument, TKeyword> } & MatchQueryOptions
}

export type MatchQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    match: MatchQueryBody<TDocument, TKeyword>
}

export const getMatchQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    query: FieldType<TDocument, TKeyword>,
    options?: MatchQueryOptions
): MatchQuery<TDocument, TKeyword> => ({
    match: { [field]: { query, ...options } } as MatchQueryBody<TDocument, TKeyword>
})
