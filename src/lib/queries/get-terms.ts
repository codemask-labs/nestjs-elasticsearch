import { Document, Field, FieldType, Keyword, KeywordType } from 'lib/types'

type TermsQueryBody<
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
> = {
    [x in TKeyword]?: Array<KeywordType<TDocument, TKeyword>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermsQuery<
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
> = {
    terms: TermsQueryBody<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermsQuery = <
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
>(field: TKeyword, values: Array<KeywordType<TDocument, TKeyword>>): TermsQuery<TDocument, TKeyword> => ({
    terms: { [field]: values } as TermsQueryBody<TDocument, TKeyword>
})
