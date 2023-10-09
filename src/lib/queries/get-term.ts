import { Document, Keyword, KeywordType } from 'lib/types'

export type TermQueryBody<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    [x in TKeyword]?: { value: KeywordType<TDocument, TKeyword> }
}

export type TermQuery<TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>> = {
    term: TermQueryBody<TDocument, TKeyword>
}

export const getTermQuery = <TDocument extends Document, TKeyword extends Keyword<TDocument> = Keyword<TDocument>>(
    field: TKeyword,
    value?: KeywordType<TDocument, TKeyword>
): TermQuery<TDocument, TKeyword> => ({
    term: { [field]: { value } } as TermQueryBody<TDocument, TKeyword>
})
