import { Document } from 'lib/types'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'

type ShouldQueryBody<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument> | BoolQuery<TDocument>

export type ShouldQuery<TDocument extends Document> = {
    should?: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>
}

export const getShouldQuery = <TDocument extends Document>(should: ShouldQueryBody<TDocument> | Array<ShouldQueryBody<TDocument>>): ShouldQuery<TDocument> => ({
    should
})
