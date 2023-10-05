import { Document } from 'lib/types'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'

export type BoolMustQuery<TDocument extends Document> = {
    term?: ReturnType<typeof getTermQuery<TDocument>>
    terms?: ReturnType<typeof getTermsQuery<TDocument>>
}

export const getBoolMustQuery = <TDocument extends Document>(query: BoolMustQuery<TDocument> | Array<BoolMustQuery<TDocument>>) => query
