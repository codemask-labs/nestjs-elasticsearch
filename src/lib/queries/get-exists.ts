import { Document, Field, FieldType } from 'lib/common'

export type ExistsQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    field: FieldType<TDocument, TKeyword>
}

export type ExistsQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    exists: ExistsQueryBody<TDocument, TKeyword>
}

/**
 * Builds an Elasticsearch `exists` query that matches documents where the specified field
 * has a non-null, non-missing value.
 *
 * @param field - The document field to check for existence. Must be a valid key of `TDocument`.
 * @returns An `ExistsQuery` object ready to be passed to a search request.
 */
export const getExistsQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword,
): ExistsQuery<TDocument, TKeyword> => ({
    exists: { field } as ExistsQueryBody<TDocument, TKeyword>,
})
