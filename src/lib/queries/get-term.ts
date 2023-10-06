import { Document, Field, FieldType } from 'lib/types'

type TermQueryBody<TDocument extends Document, TField extends Field<TDocument>> = {
    [x: string]: { value: FieldType<TDocument, TField> }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermQueryReturnType<TDocument extends Document, TField extends Field<TDocument> = any> = {
    term: TermQueryBody<TDocument, TField>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermQuery = <TDocument extends Document, TField extends Field<TDocument> = any>(field: TField, value: FieldType<TDocument, TField>): TermQueryReturnType<TDocument, TField> => ({
    term: { [field]: { value } } as TermQueryBody<TDocument, TField>
})
