import { Document } from 'lib/types'
import { TermQuery, TermsQuery } from './types'

type ShouldQueryBody<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument>

export type ShouldQueryReturnType<TDocument extends Document> = {
    should?: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>
}

export const getShouldQuery = <TDocument extends Document>(should?: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>): ShouldQueryReturnType<TDocument> => ({
    should
})
