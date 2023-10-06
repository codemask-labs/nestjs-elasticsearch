import { Document } from 'lib/types'
import { TermQuery } from './get-term'
import { TermsQuery } from './get-terms'
import { BoolQuery } from './get-bool'

type MustQueryBody<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument> | BoolQuery<TDocument>

export type MustQuery<TDocument extends Document> = {
    must?: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>
}

export const getMustQuery = <TDocument extends Document>(must: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>): MustQuery<TDocument> => ({
    must
})
