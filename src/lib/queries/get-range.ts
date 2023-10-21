import { Document, Field, FieldType } from 'lib/common'

export type RangeQueryOptions<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    format?: string
    gt?: FieldType<TDocument, TKeyword>
    gte?: FieldType<TDocument, TKeyword>
    lt?: FieldType<TDocument, TKeyword>
    lte?: FieldType<TDocument, TKeyword>
}

export type RangeQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: RangeQueryOptions<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RangeQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    range: RangeQueryBody<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRangeQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    options: RangeQueryOptions<TDocument, TKeyword>
): RangeQuery<TDocument, TKeyword> => ({
    range: { [field]: options } as RangeQueryBody<TDocument, TKeyword>
})
