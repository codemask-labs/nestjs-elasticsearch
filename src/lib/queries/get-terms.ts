import { Document, Field, FieldType } from 'lib/types'

type TermsQueryBody<TDocument extends Document, TField extends Field<TDocument>> = {
    [x: string]: Array<FieldType<TDocument, TField>>
}

export type TermsQueryReturnType<TDocument extends Document, TField extends Field<TDocument>> = {
    terms: TermsQueryBody<TDocument, TField>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermsQuery = <TDocument extends Document, TField extends Field<TDocument> = any>(field: TField, values: Array<FieldType<TDocument, TField>>): TermsQueryReturnType<TDocument, TField> => ({
    terms: { [field]: values } as TermsQueryBody<TDocument, TField>
})
