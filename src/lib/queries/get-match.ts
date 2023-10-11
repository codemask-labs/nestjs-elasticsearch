import { Document, Field, FieldType } from '..'

export type MatchQueryOptions = {
    boost?: number
    prefix_length?: number
}

export type MatchQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: { query: FieldType<TDocument, TKeyword> } & MatchQueryOptions
}

export type MatchQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    match: MatchQueryBody<TDocument, TKeyword>
}

export const getMatchQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    query?: FieldType<TDocument, TKeyword>,
    options?: MatchQueryOptions
): MatchQuery<TDocument, TKeyword> => ({
    match: { [field]: { query, ...options } } as MatchQueryBody<TDocument, TKeyword>
})
