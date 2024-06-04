import { Document, Field, FieldType } from 'lib/common'

export type MatchPhrasePrefixQueryOptions = {
    boost?: number
}

export type MatchPhrasePrefixQueryBody<TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>> = {
    [x in TField]?: { query: FieldType<TDocument, TField> } & MatchPhrasePrefixQueryOptions
}

export type MatchPhrasePrefixQuery<TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>> = {
    match_phrase_prefix: MatchPhrasePrefixQueryBody<TDocument, TField>
}

export const getMatchPhrasePrefixQuery = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField,
    query?: FieldType<TDocument, TField>,
    options?: MatchPhrasePrefixQueryOptions
): MatchPhrasePrefixQuery<TDocument, TField> => ({
    // eslint-disable-next-line camelcase
    match_phrase_prefix: { [field]: { query, ...options } } as MatchPhrasePrefixQueryBody<TDocument, TField>
})
