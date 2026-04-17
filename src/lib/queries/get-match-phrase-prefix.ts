import { Document, Key, FieldType } from 'lib/common'

export type MatchPhrasePrefixQueryOptions = {
    /**
     * @description Floating point number used to decrease or increase the importance of that query clause relative to others, affecting the relevance scoring of documents.
     * The default value is 1.0.
     */
    boost?: number
}

export type MatchPhrasePrefixQueryBody<TDocument extends Document, TField extends Key<TDocument> = Key<TDocument>> = {
    [x in TField]?: { query: FieldType<TDocument, TField> } & MatchPhrasePrefixQueryOptions
}

export type MatchPhrasePrefixQuery<TDocument extends Document, TField extends Key<TDocument> = Key<TDocument>> = {
    match_phrase_prefix: MatchPhrasePrefixQueryBody<TDocument, TField>
}

/**
 * Builds an Elasticsearch `match_phrase_prefix` query that matches documents where the given
 * field contains the specified phrase, allowing the last term to be a prefix. Useful for
 * implementing search-as-you-type functionality.
 *
 * @param field - The document field to search against.
 * @param query - The phrase (with optional trailing prefix) to match.
 * @param options - Optional settings such as `boost`.
 * @returns A `MatchPhrasePrefixQuery` object ready to be passed to a search request.
 */
export const getMatchPhrasePrefixQuery = <TDocument extends Document, TField extends Key<TDocument> = Key<TDocument>>(
    field: TField,
    query: FieldType<TDocument, TField>,
    options?: MatchPhrasePrefixQueryOptions,
): MatchPhrasePrefixQuery<TDocument, TField> => ({
    match_phrase_prefix: {
        [field]: { query, ...options },
    } as MatchPhrasePrefixQueryBody<TDocument, TField>,
})
