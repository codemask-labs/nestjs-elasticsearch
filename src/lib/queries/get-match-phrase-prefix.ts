import { Document, Key, FieldType } from 'lib/common'

export type MatchPhrasePrefixQueryOptions = {
    /**
     * @description Increases the importance of that query clause relative to others, affecting the relevance scoring of documents.
     */
    boost?: number
}

export type MatchPhrasePrefixQueryBody<TDocument extends Document, TField extends Key<TDocument> = Key<TDocument>> = {
    [x in TField]?: { query: FieldType<TDocument, TField> } & MatchPhrasePrefixQueryOptions
}

export type MatchPhrasePrefixQuery<TDocument extends Document, TField extends Key<TDocument> = Key<TDocument>> = {
    match_phrase_prefix: MatchPhrasePrefixQueryBody<TDocument, TField>
}

export const getMatchPhrasePrefixQuery = <TDocument extends Document, TField extends Key<TDocument> = Key<TDocument>>(
    field: TField,
    query: FieldType<TDocument, TField>,
    options?: MatchPhrasePrefixQueryOptions
): MatchPhrasePrefixQuery<TDocument, TField> => ({
    // eslint-disable-next-line camelcase
    match_phrase_prefix: { [field]: { query, ...options } } as MatchPhrasePrefixQueryBody<TDocument, TField>
})
