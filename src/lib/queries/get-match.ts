import { Document, Keyword, KeywordType } from '..'

export type MatchQueryOptions = {
    boost?: number
    prefix_length?: number
}

export type MatchQueryBody<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    [x in TKeyword]?: { query: KeywordType<TDocument, TKeyword> } & MatchQueryOptions
}

export type MatchQuery<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    match: MatchQueryBody<TDocument, TKeyword>
}

export const getMatchQuery = <TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>>(
    field: TKeyword,
    query: KeywordType<TDocument, TKeyword>,
    options?: MatchQueryOptions
): MatchQuery<TDocument, TKeyword> => ({
    match: { [field]: { query, ...options } } as MatchQueryBody<TDocument, TKeyword>
})
