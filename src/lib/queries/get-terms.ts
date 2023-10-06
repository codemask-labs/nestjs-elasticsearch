import { Document, Field, FieldType } from 'lib/types'

type TermsQueryBody<TDocument extends Document, TField extends Field<TDocument>> = {
    [x: string]: Array<FieldType<TDocument, TField>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermsQuery<TDocument extends Document, TField extends Field<TDocument> = any> = {
    terms: TermsQueryBody<TDocument, TField>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermsQuery = <TDocument extends Document, TField extends Field<TDocument> = any>(field: TField, values: Array<FieldType<TDocument, TField>>): TermsQuery<TDocument, TField> => ({
    terms: { [field]: values } as TermsQueryBody<TDocument, TField>
})
