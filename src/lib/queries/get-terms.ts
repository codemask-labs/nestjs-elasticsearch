import { Document, Field, FieldType, Keyword } from 'lib/types'

type TermsQueryBody<TDocument extends Document, TField extends Field<TDocument>> = {
    [Key in keyof TDocument]: Array<FieldType<TDocument, TField>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermsQuery<TDocument extends Document, TField extends Field<TDocument> = keyof TDocument> = {
    terms: TermsQueryBody<TDocument, TField>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermsQuery = <TDocument extends Document, TField extends Field<TDocument> = keyof TDocument>
(field: Keyword<TDocument, TField>, values: Array<FieldType<TDocument, TField>>): TermsQuery<TDocument, TField> => ({
    terms: { [field]: values } as TermsQueryBody<TDocument, TField>
})
