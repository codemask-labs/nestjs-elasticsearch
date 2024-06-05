import { Document } from 'lib/common'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { ExistsQuery } from './get-exists'

export type MustNotQueryBody<TDocument extends Document> =
    | TermQuery<TDocument>
    | TermsQuery<TDocument>
    | BoolQuery<TDocument>
    | ExistsQuery<TDocument>

export type MustNotQuery<TDocument extends Document> = {
    must_not: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>
}

// eslint-disable-next-line camelcase
export const getMustNotQuery = <TDocument extends Document>(
    mustNot: MustNotQueryBody<TDocument> | Array<MustNotQueryBody<TDocument>>
): MustNotQuery<TDocument> => ({
    // eslint-disable-next-line camelcase
    must_not: mustNot
})
