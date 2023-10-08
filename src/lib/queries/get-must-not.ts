import { Document } from 'lib/types'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'

export type MustNotQueryBody<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument> | BoolQuery<TDocument>

export type MustNotQuery<TDocument extends Document> = {
    must_not?: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>
}

// eslint-disable-next-line camelcase
export const getMustNotQuery = <TDocument extends Document>(must_not: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>): MustNotQuery<TDocument> => ({
    // eslint-disable-next-line camelcase
    must_not
})
