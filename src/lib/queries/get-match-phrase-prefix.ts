import { Document, Field, FieldType } from '..'

export type MatchPhrasePrefixQueryOptions = {
    boost?: number
}

export type MatchPhrasePrefixQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: { query: FieldType<TDocument, TKeyword> } & MatchPhrasePrefixQueryOptions
}

export type MatchPhrasePrefixQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    match_phrase_prefix: MatchPhrasePrefixQueryBody<TDocument, TKeyword>
}

export const getMatchPhrasePrefixQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    query?: FieldType<TDocument, TKeyword>,
    options?: MatchPhrasePrefixQueryOptions
): MatchPhrasePrefixQuery<TDocument, TKeyword> => ({
    // eslint-disable-next-line camelcase
    match_phrase_prefix: { [field]: { query, ...options } } as MatchPhrasePrefixQueryBody<TDocument, TKeyword>
})
