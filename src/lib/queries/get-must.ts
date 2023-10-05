import { Document } from 'lib/types'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'

export type MustQuery<TDocument extends Document> = {
    term?: ReturnType<typeof getTermQuery<TDocument>>
    terms?: ReturnType<typeof getTermsQuery<TDocument>>
}

export const getMustQuery = <TDocument extends Document>(must: MustQuery<TDocument> | Array<MustQuery<TDocument>>) => ({
    must
})