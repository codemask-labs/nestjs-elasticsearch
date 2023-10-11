import { Document, Field, FieldType } from 'lib/types'

export type TermQueryBody<TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>> = {
    [x in TField]?: { value: FieldType<TDocument, TField> }
}

export type TermQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    term: TermQueryBody<TDocument, TKeyword>
}

export const getTermQuery = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField,
    value?: FieldType<TDocument, TField>
): TermQuery<TDocument, TField> => ({
    term: { [field]: { value } } as TermQueryBody<TDocument, TField>
})
