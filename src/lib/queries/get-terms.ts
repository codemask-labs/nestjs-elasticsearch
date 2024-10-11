import { Document, Field, FieldType, Nullable } from 'lib/common'
import { isNil } from 'ramda'

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

export interface TermsQuerySignatures {
    <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
        field: TField,
        value: Array<FieldType<TDocument, TField>>,
        options?: TermsQueryOptions
    ): TermsQuery<TDocument, TField>
    <TDocument extends Document, TField extends Field<TDocument> = Field<TDocument>>(
        field: TField,
        value: Nullable<Array<FieldType<TDocument, TField>>>,
        options?: TermsQueryOptions
    ): Nullable<TermsQuery<TDocument, TField>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTermsQuery: TermsQuerySignatures = (field: any, values: any, options?: TermsQueryOptions): any => {
    if (isNil(values)) {
        return null
    }

    return {
        terms: { [field]: values, ...options }
    }
}
