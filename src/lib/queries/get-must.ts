import { Document } from 'lib/types'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'
import { RangeQuery } from './get-range'

export type MustQueryBody<TDocument extends Document> = BoolQuery<TDocument> | TermQuery<TDocument> | TermsQuery<TDocument> | RangeQuery<TDocument>

export type MustQuery<TDocument extends Document> = {
    must?: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>
}

export const getMustQuery = <TDocument extends Document>(must: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>): MustQuery<TDocument> => ({
    must
})
