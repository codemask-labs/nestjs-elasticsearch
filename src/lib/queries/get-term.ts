import { Document, Field, FieldType } from 'lib/types'

export type TermQueryBody<TDocument extends Document, TField extends Field<TDocument>> = {
    [Key in keyof TDocument]?: { value: FieldType<TDocument, TField> }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TermQuery<TDocument extends Document, TField extends Field<TDocument> = keyof TDocument> = {
    term: TermQueryBody<TDocument, TField>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermQuery = <TDocument extends Document, TField extends Field<TDocument> = keyof TDocument>(field: TField, value: FieldType<TDocument, TField>): TermQuery<TDocument, TField> => ({
    term: { [field]: { value } } as TermQueryBody<TDocument, TField>
})
