import { Document, Field, FieldType } from 'lib/common'

export type MatchQueryOptions = {
    /**
     * @description Floating point number used to decrease or increase the importance of that query clause relative to others, affecting the relevance scoring of documents.
     * The default value is 1.0.
     */
    boost?: number

    /**
     * @description Number of beginning characters left unchanged for fuzzy matching. The default value is 0.
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

/**
 * Builds an Elasticsearch `match` query for full-text search on a given field.
 * The query analyzes the input text and matches documents containing any of the resulting tokens.
 * Supports fuzziness and boost via `options`.
 *
 * @param field - The document field to run the match query against.
 * @param query - The text value to search for.
 * @param options - Optional settings such as `boost`, `prefix_length`, and `fuzziness`.
 * @returns A `MatchQuery` object ready to be passed to a search request.
 */
export const getMatchQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    query: FieldType<TDocument, TKeyword>,
    options?: MatchQueryOptions,
): MatchQuery<TDocument, TKeyword> => ({
    match: { [field]: { query, ...options } } as MatchQueryBody<TDocument, TKeyword>,
})
