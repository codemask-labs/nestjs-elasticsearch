import { Document, Field, FieldType } from 'lib/common'

export type RangeQueryOptions<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    /**
     * @description Allows to specify the format of the date or numeric values being queried.
     * This ensures accurate comparison of values, particularly useful when dealing with dates or numbers in specific formats.
     * @example 'yyyy-MM-dd'
     */
    format?: string

    gt?: FieldType<TDocument, TKeyword>
    gte?: FieldType<TDocument, TKeyword>
    lt?: FieldType<TDocument, TKeyword>
    lte?: FieldType<TDocument, TKeyword>
}

export type RangeQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: RangeQueryOptions<TDocument, TKeyword>
}

export type RangeQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    range: RangeQueryBody<TDocument, TKeyword>
}

export const getRangeQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    options: RangeQueryOptions<TDocument, TKeyword>,
): RangeQuery<TDocument, TKeyword> => ({
    range: { [field]: options } as RangeQueryBody<TDocument, TKeyword>,
})
