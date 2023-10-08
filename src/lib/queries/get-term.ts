import { Document, Keyword, KeywordType } from 'lib/types'

export type TermQueryBody<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    [x in TKeyword]?: { value: KeywordType<TDocument, TKeyword> }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermQuery<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    term: TermQueryBody<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermQuery = <TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>>(
    field: TKeyword,
    value: KeywordType<TDocument, TKeyword>
): TermQuery<TDocument, TKeyword> => ({
    term: { [field]: { value } } as TermQueryBody<TDocument, TKeyword>
})
