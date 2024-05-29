import { Document, Field, FieldType } from 'lib/common'

export type ExistsQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    field: FieldType<TDocument, TKeyword>
}

export type ExistsQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    exists: ExistsQueryBody<TDocument, TKeyword>
}

export const getExistsQuery = <TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>>(
    field: TKeyword
): ExistsQuery<TDocument, TKeyword> => ({
    exists: { field } as ExistsQueryBody<TDocument, TKeyword>
})
