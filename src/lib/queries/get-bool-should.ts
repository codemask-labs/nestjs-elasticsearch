import { Document } from 'lib/types'
import { getTermQuery } from './get-term'
import { getTermsQuery } from './get-terms'

export type BoolShouldQuery<TDocument extends Document> = {
    term?: ReturnType<typeof getTermQuery<TDocument>>
    terms?: ReturnType<typeof getTermsQuery<TDocument>>
}

export const getBoolShouldQuery = <TDocument extends Document>(query: BoolShouldQuery<TDocument> | Array<BoolShouldQuery<TDocument>>) => query
