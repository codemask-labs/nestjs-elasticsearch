import { Document, Field, FieldType } from 'lib/common'

type TermsQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: Array<FieldType<TDocument, TKeyword>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermsQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    terms: TermsQueryBody<TDocument, TKeyword>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermsQuery = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField,
    values?: Array<FieldType<TDocument, TField>>
): TermsQuery<TDocument, TField> => ({
    terms: { [field]: values } as TermsQueryBody<TDocument, TField>
})
