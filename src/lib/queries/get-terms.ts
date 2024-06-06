import { Document, Field, FieldType } from 'lib/common'

export type TermsQueryOptions = {
    /**
     * @description Floating point number used to decrease or increase the importance of that query clause relative to others, affecting the relevance scoring of documents.
     * The default value is 1.0.
     */
    boost?: number
}

export type TermsQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: Array<FieldType<TDocument, TKeyword>>
}

export type TermsQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    terms: TermsQueryBody<TDocument, TKeyword>
}

export const getTermsQuery = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField,
    values: Array<FieldType<TDocument, TField>>,
    options?: TermsQueryOptions
): TermsQuery<TDocument, TField> => ({
    terms: { [field]: values, ...options } as TermsQueryBody<TDocument, TField>
})
