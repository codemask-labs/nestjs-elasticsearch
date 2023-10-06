import { Document } from 'lib/types'
import { TermQuery, TermsQuery } from './types'

type MustQueryBody<TDocument extends Document> = TermQuery<TDocument> | TermsQuery<TDocument>

export type MustQueryReturnType<TDocument extends Document> = {
    must?: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>
}

export const getMustQuery = <TDocument extends Document>(must?: MustQueryBody<TDocument> | Array<MustQueryBody<TDocument>>): MustQueryReturnType<TDocument> => ({
    must
})
