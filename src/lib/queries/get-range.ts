import { Document, Keyword, KeywordType } from 'lib/types'

export type RangeQueryOptions<
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
> = {
    gt?: KeywordType<TDocument, TKeyword>
    gte?: KeywordType<TDocument, TKeyword>
    lt?: KeywordType<TDocument, TKeyword>
    lte?: KeywordType<TDocument, TKeyword>
}

export type RangeQueryBody<
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
> = {
    [x in TKeyword]?: RangeQueryOptions<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RangeQuery<
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
> = {
    range: RangeQueryBody<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRangeQuery = <
    TDocument extends Document,
    TKeyword extends Keyword<TDocument> = Keyword<TDocument>
>(field: TKeyword, options: RangeQueryOptions<TDocument, TKeyword>): RangeQuery<TDocument, TKeyword> => ({
    range: { [field]: options } as RangeQueryBody<TDocument, TKeyword>
})
