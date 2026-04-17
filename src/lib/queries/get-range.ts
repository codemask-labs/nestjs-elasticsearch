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

/**
 * Builds an Elasticsearch `range` query that matches documents where the given field value
 * falls within the specified bounds. Supports numeric, date, and string field types.
 * Use `gt`, `gte`, `lt`, `lte` in `options` to define the range boundaries.
 *
 * @param field - The document field to apply the range filter on.
 * @param options - Range bounds (`gt`, `gte`, `lt`, `lte`) and optional `format` for date fields.
 * @returns A `RangeQuery` object ready to be passed to a search request.
 */
export const getRangeQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
    options: RangeQueryOptions<TDocument, TKeyword>,
): RangeQuery<TDocument, TKeyword> => ({
    range: { [field]: options } as RangeQueryBody<TDocument, TKeyword>,
})
