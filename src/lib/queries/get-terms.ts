import { Document, Field, FieldType } from 'lib/common'
import { Order } from 'lib/enums'

export type TermsQueryOptions = {
    size?: number
    order?: {
        [x: string]: Order
    }
}

export type TermsQueryBody<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    [x in TKeyword]?: Array<FieldType<TDocument, TKeyword>>
}

export type TermsQuery<TDocument extends Document, TKeyword extends Field<TDocument> = Field<TDocument>> = {
    terms: TermsQueryBody<TDocument, TKeyword>
}

export const getTermsQuery = <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
    field: TField,
    values?: Array<FieldType<TDocument, TField>>,
    options?: TermsQueryOptions
): TermsQuery<TDocument, TField> => ({
    terms: { [field]: values, ...options } as TermsQueryBody<TDocument, TField>
})
