import { Document, Field, FieldType, Nullable, NullableFieldType } from 'lib/common'
import { isNil } from 'ramda'

export type TermQueryOptions = {
    /**
     * @description Allows the query to match terms regardless of their case, making the search case-insensitive. The default value is false.
     */
    case_insensitive?: boolean

    /**
     * @description Floating point number used to decrease or increase the importance of that query clause relative to others, affecting the relevance scoring of documents.
     * The default value is 1.0.
     */
    boost?: number
}

export type TermQueryBody<TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>> = {
    [x in TField]?: TermQueryOptions & {
        value: FieldType<TDocument, TField>
    }
}

export type TermQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    term: TermQueryBody<TDocument, TKeyword>
}

/**
 * Builds an Elasticsearch `term` query that matches documents where the given field contains
 * the exact specified value. When `value` is a concrete non-nil value, the return type is
 * non-nullable. When `value` is `null` or `undefined`, returns `null` — making it safe to use
 * with optional filter values. Pass results through `getQueries` to filter out nulls.
 *
 * @param field - The document field to filter on.
 * @param value - The exact value to match, or `null`/`undefined` to skip the query.
 * @param options - Optional settings such as `boost` and `case_insensitive`.
 * @returns A `TermQuery` if value is present, or `null`/`undefined` if value is nil.
 */
export interface TermQueryOverloads {
    <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
        field: TField,
        value: FieldType<TDocument, TField>,
        options?: TermQueryOptions,
    ): TermQuery<TDocument, TField>
    <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
        field: TField,
        value?: NullableFieldType<TDocument, TField>,
        options?: TermQueryOptions,
    ): Nullable<TermQuery<TDocument, TField>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermQuery: TermQueryOverloads = (field: any, value: any, options?: TermQueryOptions): any => {
    if (isNil(value)) {
        return null
    }

    return {
        term: { [field]: { value, ...options } },
    }
}
