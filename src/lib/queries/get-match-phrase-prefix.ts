import { Document, Keyword, KeywordType } from '..'

export type MatchPhrasePrefixQueryOptions = {
    boost?: number
}

export type MatchPhrasePrefixQueryBody<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    [x in TKeyword]?: { query: KeywordType<TDocument, TKeyword> } & MatchPhrasePrefixQueryOptions
}

export type MatchPhrasePrefixQuery<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    match_phrase_prefix: MatchPhrasePrefixQueryBody<TDocument, TKeyword>
}

export const getMatchPhrasePrefixQuery = <TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>>(
    field: TKeyword,
    query?: KeywordType<TDocument, TKeyword>,
    options?: MatchPhrasePrefixQueryOptions
): MatchPhrasePrefixQuery<TDocument, TKeyword> => ({
    // eslint-disable-next-line camelcase
    match_phrase_prefix: { [field]: { query, ...options } } as MatchPhrasePrefixQueryBody<TDocument, TKeyword>
})
